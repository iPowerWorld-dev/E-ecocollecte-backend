module.exports = (sequelize, DataTypes) => {
    const Collecte = sequelize.define('Collecte', {
        projet_collecte_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        collecteur_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        point_de_collecte: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
        date_heure: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        statut: {
            type: DataTypes.STRING,
            defaultValue: 'planifiée',
        },
    });

    return Collecte;
};
