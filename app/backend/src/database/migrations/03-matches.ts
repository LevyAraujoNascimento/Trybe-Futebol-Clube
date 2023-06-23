import { QueryInterface, DataTypes, Model } from 'sequelize';

export default {
    up(queryInterface: QueryInterface) {
        return queryInterface.createTable<Model>('matches', {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                allowNull: false,
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
                }
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
              }
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
                field: 'in_progress'
            },
        })
    },
    down(queryInterface: QueryInterface) {
        return queryInterface.dropTable('matches');
    }
}