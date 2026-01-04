const { query, getClient } = require('../db');

// Helper function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Get all properties (Admin)
const getAllProperties = async (req, res) => {
  try {
    const result = await query(`
      SELECT p.*,
        (SELECT json_agg(json_build_object('id', pi.id, 'image_url', pi.image_url, 'display_order', pi.display_order) ORDER BY pi.display_order)
         FROM property_images pi WHERE pi.property_id = p.id) as images
      FROM properties p
      ORDER BY p.created_at DESC
    `);

    const properties = result.rows.map(prop => ({
      ...prop,
      amenities: JSON.parse(prop.amenities || '[]'),
      activities: JSON.parse(prop.activities || '[]'),
      highlights: JSON.parse(prop.highlights || '[]'),
      policies: prop.policies ? JSON.parse(prop.policies) : [],
      images: prop.images || [],
    }));

    return res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.error('Get all properties error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch properties.',
    });
  }
};

// Get public properties (only active)
const getPublicProperties = async (req, res) => {
  try {
    const result = await query(`
      SELECT p.*,
        (SELECT json_agg(json_build_object('id', pi.id, 'image_url', pi.image_url, 'display_order', pi.display_order) ORDER BY pi.display_order)
         FROM property_images pi WHERE pi.property_id = p.id) as images
      FROM properties p
      WHERE p.is_active = true
      ORDER BY p.is_top_selling DESC, p.created_at DESC
    `);

    const properties = result.rows.map(prop => ({
      ...prop,
      amenities: JSON.parse(prop.amenities || '[]'),
      activities: JSON.parse(prop.activities || '[]'),
      highlights: JSON.parse(prop.highlights || '[]'),
      policies: prop.policies ? JSON.parse(prop.policies) : [],
      images: prop.images || [],
    }));

    return res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.error('Get public properties error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch properties.',
    });
  }
};

// Get single property by ID
const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(`
      SELECT p.*,
        (SELECT json_agg(json_build_object('id', pi.id, 'image_url', pi.image_url, 'display_order', pi.display_order) ORDER BY pi.display_order)
         FROM property_images pi WHERE pi.property_id = p.id) as images
      FROM properties p
      WHERE p.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Property not found.',
      });
    }

    const property = {
      ...result.rows[0],
      amenities: JSON.parse(result.rows[0].amenities || '[]'),
      activities: JSON.parse(result.rows[0].activities || '[]'),
      highlights: JSON.parse(result.rows[0].highlights || '[]'),
      policies: result.rows[0].policies ? JSON.parse(result.rows[0].policies) : [],
      images: result.rows[0].images || [],
    };

    return res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error('Get property by ID error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch property.',
    });
  }
};

// Get single property by Slug (Public)
const getPublicPropertyBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await query(`
      SELECT p.*,
        (SELECT json_agg(json_build_object('id', pi.id, 'image_url', pi.image_url, 'display_order', pi.display_order) ORDER BY pi.display_order)
         FROM property_images pi WHERE pi.property_id = p.id) as images
      FROM properties p
      WHERE p.slug = $1 AND p.is_active = true
    `, [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Property not found.',
      });
    }

    const property = {
      ...result.rows[0],
      amenities: JSON.parse(result.rows[0].amenities || '[]'),
      activities: JSON.parse(result.rows[0].activities || '[]'),
      highlights: JSON.parse(result.rows[0].highlights || '[]'),
      policies: result.rows[0].policies ? JSON.parse(result.rows[0].policies) : [],
      images: result.rows[0].images || [],
    };

    return res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error('Get public property by slug error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch property.',
    });
  }
};

// Create new property
const createProperty = async (req, res) => {
  const client = await getClient();

  try {
    const {
      title,
      description,
      category,
      location,
      rating,
      price,
      price_note,
      capacity,
      check_in_time,
      check_out_time,
      status,
      is_top_selling,
      is_active,
      is_available,
      contact,
      amenities,
      activities,
      highlights,
      policies,
      images,
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !location || !price || !price_note || !capacity) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields.',
      });
    }

    // Generate slug
    const slug = generateSlug(title);

    // Start transaction
    await client.query('BEGIN');

    // Insert property
    const propertyResult = await client.query(
      `INSERT INTO properties (
        title, slug, description, category, location, rating, price, price_note,
        capacity, check_in_time, check_out_time, status, is_top_selling, is_active, is_available,
        contact, amenities, activities, highlights, policies, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, CURRENT_TIMESTAMP)
      RETURNING *`,
      [
        title,
        slug,
        description,
        category,
        location,
        rating || 4.5,
        price,
        price_note,
        capacity,
        check_in_time || '2:00 PM',
        check_out_time || '11:00 AM',
        status || 'Verified',
        is_top_selling || false,
        is_active !== undefined ? is_active : true,
        is_available !== undefined ? is_available : true,
        contact || '+91 8669505727',
        JSON.stringify(amenities || []),
        JSON.stringify(activities || []),
        JSON.stringify(highlights || []),
        JSON.stringify(policies || []),
      ]
    );

    const newProperty = propertyResult.rows[0];

    // Insert images if provided
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await client.query(
          'INSERT INTO property_images (property_id, image_url, display_order) VALUES ($1, $2, $3)',
          [newProperty.id, images[i], i]
        );
      }
    }

    // Commit transaction
    await client.query('COMMIT');

    return res.status(201).json({
      success: true,
      message: 'Property created successfully.',
      data: {
        id: newProperty.id,
        slug: newProperty.slug,
      },
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create property error:', error);

    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'Property with this title already exists.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to create property.',
    });
  } finally {
    client.release();
  }
};

// Update property
const updateProperty = async (req, res) => {
  const client = await getClient();

  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      location,
      rating,
      price,
      price_note,
      capacity,
      check_in_time,
      check_out_time,
      status,
      is_top_selling,
      is_active,
      is_available,
      contact,
      amenities,
      activities,
      highlights,
      policies,
      images,
    } = req.body;

    // Check if property exists
    const checkResult = await query('SELECT id FROM properties WHERE id = $1', [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Property not found.',
      });
    }

    // Generate slug if title is provided
    const slug = title ? generateSlug(title) : null;

    // Start transaction
    await client.query('BEGIN');

    // Build update query dynamically
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramCount}`);
      values.push(title);
      paramCount++;
      updates.push(`slug = $${paramCount}`);
      values.push(slug);
      paramCount++;
    }
    if (description !== undefined) {
      updates.push(`description = $${paramCount}`);
      values.push(description);
      paramCount++;
    }
    if (category !== undefined) {
      updates.push(`category = $${paramCount}`);
      values.push(category);
      paramCount++;
    }
    if (location !== undefined) {
      updates.push(`location = $${paramCount}`);
      values.push(location);
      paramCount++;
    }
    if (rating !== undefined) {
      updates.push(`rating = $${paramCount}`);
      values.push(rating);
      paramCount++;
    }
    if (price !== undefined) {
      updates.push(`price = $${paramCount}`);
      values.push(price);
      paramCount++;
    }
    if (price_note !== undefined) {
      updates.push(`price_note = $${paramCount}`);
      values.push(price_note);
      paramCount++;
    }
    if (capacity !== undefined) {
      updates.push(`capacity = $${paramCount}`);
      values.push(capacity);
      paramCount++;
    }
    if (check_in_time !== undefined) {
      updates.push(`check_in_time = $${paramCount}`);
      values.push(check_in_time);
      paramCount++;
    }
    if (check_out_time !== undefined) {
      updates.push(`check_out_time = $${paramCount}`);
      values.push(check_out_time);
      paramCount++;
    }
    if (status !== undefined) {
      updates.push(`status = $${paramCount}`);
      values.push(status);
      paramCount++;
    }
    if (is_top_selling !== undefined) {
      updates.push(`is_top_selling = $${paramCount}`);
      values.push(is_top_selling);
      paramCount++;
    }
    if (is_active !== undefined) {
      updates.push(`is_active = $${paramCount}`);
      values.push(is_active);
      paramCount++;
    }
    if (is_available !== undefined) {
      updates.push(`is_available = $${paramCount}`);
      values.push(is_available);
      paramCount++;
    }
    if (contact !== undefined) {
      updates.push(`contact = $${paramCount}`);
      values.push(contact);
      paramCount++;
    }
    if (amenities !== undefined) {
      updates.push(`amenities = $${paramCount}`);
      values.push(JSON.stringify(amenities));
      paramCount++;
    }
    if (activities !== undefined) {
      updates.push(`activities = $${paramCount}`);
      values.push(JSON.stringify(activities));
      paramCount++;
    }
    if (highlights !== undefined) {
      updates.push(`highlights = $${paramCount}`);
      values.push(JSON.stringify(highlights));
      paramCount++;
    }
    if (policies !== undefined) {
      updates.push(`policies = $${paramCount}`);
      values.push(JSON.stringify(policies));
      paramCount++;
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);

    values.push(id);

    const updateQuery = `UPDATE properties SET ${updates.join(', ')} WHERE id = $${paramCount}`;

    await client.query(updateQuery, values);

    // Update images if provided
    if (images !== undefined) {
      // Delete old images
      await client.query('DELETE FROM property_images WHERE property_id = $1', [id]);

      // Insert new images
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          await client.query(
            'INSERT INTO property_images (property_id, image_url, display_order) VALUES ($1, $2, $3)',
            [id, images[i], i]
          );
        }
      }
    }

    // Commit transaction
    await client.query('COMMIT');

    return res.status(200).json({
      success: true,
      message: 'Property updated successfully.',
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Update property error:', error);

    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'Property with this title already exists.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to update property.',
    });
  } finally {
    client.release();
  }
};

// Delete property
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM properties WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Property not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Property deleted successfully.',
    });
  } catch (error) {
    console.error('Delete property error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete property.',
    });
  }
};

// Toggle property status (active/inactive or top selling)
const togglePropertyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { field, value } = req.body;

    if (!field || value === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Field and value are required.',
      });
    }

    if (!['is_active', 'is_top_selling', 'is_available'].includes(field)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid field. Only is_active, is_top_selling and is_available can be toggled.',
      });
    }

    const updateQuery = `UPDATE properties SET ${field} = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`;
    const result = await query(updateQuery, [value, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Property not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Property status updated successfully.',
    });
  } catch (error) {
    console.error('Toggle property status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update property status.',
    });
  }
};

module.exports = {
  getAllProperties,
  getPublicProperties,
  getPublicPropertyBySlug,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  togglePropertyStatus,
};
