const mongoose = require("mongoose");

const Journey = mongoose.model("Journey", {
    stop: {
        station: {
            id: {
                type: String
            },
            name: {
                type: String
            },
            score: {
                type: String
            },
            coordinate: {
                type: {
                    type: String
                },
                x: {
                    type: Number
                },
                y: {
                    type: Number
                }
            },
            distance: {
                type: Number
            }
        },

        arrivalTimestamp: {
            type: Number
        },

        departureTimestamp: {
            type: Number
        },
        delay: {
            type: Number
        },
        platform: {
            type: String
        },

        location: {
            id: {
                type: String
            },
            name: {
                type: String
            },
            coordinate: {
                type: {
                    type: "String"
                },
                x: {
                    type: Number
                },
                y: {
                    type: Number
                }
            },
            distance: {
                type: Number
            }
        }
    },
    name: {
        type: String
    },
    category: {
        type: String
    },
    subcategory: {
        type: String
    },
    categoryCode: {
        type: String
    },
    number: {
        type: String
    },
    operator: {
        type: String
    },
    to: {
        type: String
    },
    passList: [
        {
            station: {
                id: {
                    type: String
                },
                name: {
                    type: String
                },
                score: {
                    type: String
                },
                coordinate: {
                    type: {
                        type: String
                    },
                    x: {
                        type: Number
                    },
                    y: {
                        type: Number
                    }
                },
                distance: {
                    type: Number
                }
            },

            arrivalTimestamp: {
                type: Number
            },

            departureTimestamp: {
                type: Number
            },
            delay: {
                type: Number
            },
            platform: {
                type: String
            },

            location: {
                id: {
                    type: String
                },
                name: {
                    type: String
                },
                coordinate: {
                    type: {
                        type: "String"
                    },
                    x: {
                        type: Number
                    },
                    y: {
                        type: Number
                    }
                },
                distance: {
                    type: Number
                }
            }
        }
    ]
});

module.exports = { Journey };
