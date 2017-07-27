const sortEventSchedule = require("./")

test("should sort schedule", () => {
  const result = getSorted()
  const unSorted = getUnSorted()
  expect(sortEventSchedule(unSorted)).toEqual(result)
})

function getUnSorted() {
  return {
    name: "event one",
    schedule: [
      {
        time: {
          unix: 2313423
        }
      },
      {
        time: {
          unix: 23123
        }
      },
      {
        time: {
          unix: 9313423
        }
      },
      {
        time: {
          unix: 23
        }
      }
    ]
  }
}
function getSorted() {
  return {
    name: "event one",
    schedule: [
      {
        time: {
          unix: 23
        }
      },
      {
        time: {
          unix: 23123
        }
      },
      {
        time: {
          unix: 2313423
        }
      },
      {
        time: {
          unix: 9313423
        }
      }
    ]
  }
}
