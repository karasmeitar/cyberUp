module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Candidate', {
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: false
		},
			last_name: {
			type: DataTypes.STRING,
			allowNull: true,
			primaryKey: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			primaryKey: false
		},
		code: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: false
		}
	},
	{
		timestamps:false,
		tableName: 'candidate',
	});
};
