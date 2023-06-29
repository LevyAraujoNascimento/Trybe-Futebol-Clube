import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam';

class SequelizeMatch extends Model<InferAttributes<SequelizeMatch>,
InferCreationAttributes<SequelizeMatch>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatch.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

SequelizeMatch.belongsTo(SequelizeTeam, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeMatch.belongsTo(SequelizeTeam, { foreignKey: 'awayTeamId', as: 'awayTeam' });

SequelizeTeam.hasMany(SequelizeMatch, { foreignKey: 'homeTeamId' });
SequelizeTeam.hasMany(SequelizeMatch, { foreignKey: 'awayTeamId' });

export default SequelizeMatch;
