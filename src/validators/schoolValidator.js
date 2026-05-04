const isEmptyString = (value) => {
  return typeof value !== "string" || value.trim().length === 0;
};

const parseNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return NaN;
  }

  return Number(value);
};

const isValidLatitude = (value) => {
  return Number.isFinite(value) && value >= -90 && value <= 90;
};

const isValidLongitude = (value) => {
  return Number.isFinite(value) && value >= -180 && value <= 180;
};

const validateAddSchoolInput = (body) => {
  const errors = [];

  const name = typeof body.name === "string" ? body.name.trim() : body.name;
  const address = typeof body.address === "string" ? body.address.trim() : body.address;
  const latitude = parseNumber(body.latitude);
  const longitude = parseNumber(body.longitude);

  if (isEmptyString(name)) {
    errors.push("name is required and must be a non-empty string");
  }

  if (typeof name === "string" && name.trim().length > 255) {
    errors.push("name must not exceed 255 characters");
  }

  if (isEmptyString(address)) {
    errors.push("address is required and must be a non-empty string");
  }

  if (typeof address === "string" && address.trim().length > 500) {
    errors.push("address must not exceed 500 characters");
  }

  if (!isValidLatitude(latitude)) {
    errors.push("latitude is required and must be a number between -90 and 90");
  }

  if (!isValidLongitude(longitude)) {
    errors.push("longitude is required and must be a number between -180 and 180");
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: {
      name,
      address,
      latitude,
      longitude
    }
  };
};

const validateCoordinates = (query) => {
  const errors = [];

  const latitude = parseNumber(query.latitude);
  const longitude = parseNumber(query.longitude);

  if (!isValidLatitude(latitude)) {
    errors.push("latitude query parameter is required and must be a number between -90 and 90");
  }

  if (!isValidLongitude(longitude)) {
    errors.push("longitude query parameter is required and must be a number between -180 and 180");
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: {
      latitude,
      longitude
    }
  };
};

module.exports = {
  validateAddSchoolInput,
  validateCoordinates
};
