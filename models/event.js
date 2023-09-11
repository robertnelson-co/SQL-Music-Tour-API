'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Stage, StageEvent, MeetGreet, SetTime }) {
      //stages
      Event.belongsToMany(Stage, {
        foreignKey: 'event_id',
        as: 'stages',
        through: StageEvent
      })
      //meetgreets
      Event.masMany(MeetGreet, {
        foreignKey: 'meet_greet_id',
        as: "meet_greets"
      })
      //settimes
      Event.hasMany(SetTime, {
        foreignKey: 'set_time_id',
        as: "set_times"
      })
      // define association here
    }
  }
  Event.init({
    event_id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    date: {
      type:DataTypes.DATE,
      allowNull:false,
    },
    start_time: {
      type:DataTypes.DATE,
      allowNull:false,
    },
    end_time: {
      type:DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false
  });
  return Event;
};