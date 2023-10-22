import React from 'react';

function EmployeeData({ data, setData, errors }) {
	const handleDataChange = (e, index) => {
		let newData = { ...data };
		newData.employees[index][e.target.name] = e.target.value;
		setData({ ...newData });
	};

	return (
		<>
			{data.employees.map((employee, index) => {
				const employeeErrors = errors.filter(
					(error) => error.employeeId === employee.id
				);
				return (
					<div className='emp_form_div' key={index}>
						<p className='emp_number'>Employee number #{index + 1}</p>
						<div className='employeeName-container'>
							<input
								type='text'
								name='employeeName'
								className='emp_name'
								placeholder='Name'
								value={employee.employeeName}
								onChange={(e) => handleDataChange(e, index)}
							/>
							{employeeErrors.some((error) => error.path === 'employeeName') ? (
								<p className='error-message'>
									{
										employeeErrors.find(
											(error) => error.path === 'employeeName'
										).message
									}
								</p>
							) : null}
						</div>
						<div className='employeeEmail-container'>
							<input
								type='text'
								name='employeeEmail'
								className='emp_email'
								placeholder='Email'
								value={employee.employeeEmail}
								onChange={(e) => handleDataChange(e, index)}
							/>
							{employeeErrors.some(
								(error) => error.path === 'employeeEmail'
							) ? (
								<p className='error-message'>
									{
										employeeErrors.find(
											(error) => error.path === 'employeeEmail'
										).message
									}
								</p>
							) : null}
						</div>
						<div className='jobTitle-container'>
							<select
								name='jobTitle'
								className='emp_job'
								placeholder='Job Title'
								value={employee.jobTitle}
								onChange={(e) => handleDataChange(e, index)}
							>
								<option value='' disabled selected hidden>
									Select a job title
								</option>
								<option value='accountant'>accountant</option>
								<option value='software-developer'>Software developer</option>
								<option value='software-tester'>Software tester</option>
								<option value='manager'>Manager</option>
							</select>
							{employeeErrors.some((error) => error.path === 'jobTitle') ? (
								<p className='error-message'>
									{
										employeeErrors.find((error) => error.path === 'jobTitle')
											.message
									}
								</p>
							) : null}
						</div>
						<div className='employeeAge-container'>
							<input
								type='number'
								name='employeeAge'
								className='emp_age'
								min='18'
								value={employee.employeeAge}
								onChange={(e) => handleDataChange(e, index)}
								noValidate
							/>
							{employeeErrors.some((error) => error.path === 'employeeAge') ? (
								<p className='error-message'>
									{
										employeeErrors.find((error) => error.path === 'employeeAge')
											.message
									}
								</p>
							) : null}
						</div>
						<input
							type='file'
							className='emp_file'
							name='upload'
							accept='application/pdf'
						/>
					</div>
				);
			})}
		</>
	);
}

export default EmployeeData;
