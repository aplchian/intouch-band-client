var Validator = require("jsonschema").Validator
var v = new Validator()

var schema = {
  id: "Event",
  type: "object",
  properties: {
    _id: { type: "string", required: true },
    type: { type: "string", required: true },
    schedule: {
      type: "array",
      required: true,
      items: {
        type: "object",
        properties: {
          id: { type: "string", required: true },
          name: { type: "string", required: true },
          time: {
            type: "object",
            properties: {
              string: {
                required: true,
                type: "string"
              },
              unix: {
                required: true,
                type: "number"
              }
            }
          }
        }
      }
    },
    contacts: {
      type: "array",
      required: true,
      items: {
        type: "object",
        properties: {
          id: { type: "string", required: true },
          type: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" },
          name: { type: "string" }
        }
      }
    },
    files: {
      type: "array",
      required: true,
      items: {
        type: "object",
        properties: {
          id: { type: "string", required: true },
          name: { type: "string", required: true },
          bucket: { type: "string", required: true },
          url: { type: "string", required: true }
        }
      }
    },
    date: {
      type: "string"
    },
    band: {
      type: "string",
      required: true
    },
    name: {
      type: "string",
      required: true
    },
    venue: { type: "string" },
    city: { type: "string" },
    state: { type: "string" },
    addressone: { type: "string" },
    addresstwo: { type: "string" },
    parking: { type: "string" },
    zipcode: { type: "number" },
    notes: {
      type: "string"
    },
    confirmed: {
      type: "boolean"
    }
  }
}

const validateProvider = async event => {
  return v.validate(event, schema)
}

module.exports = validateProvider
