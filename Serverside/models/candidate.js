module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Candidate', {
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
			last_name: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
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
