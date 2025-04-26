import EmployeeProfile from './EmployeeModels/Employee.js';
import EmployeeExperience from './EmployeeModels/EmployeeExperience.js';
import EmployeeEducation from './EmployeeModels/EmployeeEduaction.js';

EmployeeProfile.hasMany(EmployeeExperience, { foreignKey: 'employeeId' });
EmployeeExperience.belongsTo(EmployeeProfile, { foreignKey: 'employeeId' });

EmployeeProfile.hasMany(EmployeeEducation, { foreignKey: 'employeeId' });
EmployeeEducation.belongsTo(EmployeeProfile, { foreignKey: 'employeeId' });
