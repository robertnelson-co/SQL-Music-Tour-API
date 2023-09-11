'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meet_greet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Band, Event }) {
      //band
      Meet_greet.belongsTo(Band, {
        foreignKey: 'band_id',
        as: "band"
      })
      //event
      Meet_greet.belongsTo( Event, {
        foreignKey: 'event_id',
        as: "event"
      })
    }
  }
  Meet_greet.init({
    event_id: {
      type:DataTypes.SMALLINT,
      allowNull:false,
    },
    band_id: {
      type:DataTypes.SMALLINT,
      allowNull:false,
    },
    meet_start_time: {
      type:DataTypes.DATE,
      allowNull:false,
    },
    meet_end_time: {
      type:DataTypes.DATE,
      allowNull:false,
    },
    meet_greet_id: {
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true,
    }
  }, {
    sequelize,
    modelName: 'Meet_greet',
    tablename: 'meet_greet',
    timestamp:false,
  });
  return Meet_greet;
};