const pool = require("../config/db");
const { validateAddSchoolInput, validateCoordinates } = require("../validators/schoolValidator");
const { calculateDistanceKm } = require("../utils/distance");


const addSchool = async (req, res, next) => {
  try {
    const { isValid, errors, data } = validateAddSchoolInput(req.body);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }

    const query = `
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [
      data.name,
      data.address,
      data.latitude,
      data.longitude
    ]);

    return res.status(201).json({
      success: true,
      message: "School added successfully",
      data: {
        id: result.insertId,
        name: data.name,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude
      }
    });
  } catch (error) {
    next(error);
  }
};

const listSchools = async (req, res, next) => {
  try {
    const { isValid, errors, data } = validateCoordinates(req.query);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }

    const [schools] = await pool.execute(`
      SELECT id, name, address, latitude, longitude
      FROM schools
    `);

    const sortedSchools = schools
      .map((school) => {
        const distanceKm = calculateDistanceKm(
          data.latitude,
          data.longitude,
          Number(school.latitude),
          Number(school.longitude)
        );

        return {
          ...school,
          latitude: Number(school.latitude),
          longitude: Number(school.longitude),
          distanceKm: Number(distanceKm.toFixed(2))
        };
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);

    return res.status(200).json({
      success: true,
      message: "Schools fetched successfully",
      count: sortedSchools.length,
      data: sortedSchools
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSchool,
  listSchools
};
