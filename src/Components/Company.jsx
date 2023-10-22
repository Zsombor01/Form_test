import React from 'react';
import { useState } from 'react';
import EmployeeData from './employee';
import { companyDataValidationSchema } from '../Validations/CompanyDataValidation';
import { employeeDataValidationSchema } from '../Validations/EmployeeDataValidation';
import { v4 as uuidv4 } from 'uuid';

function CompanyData() {
	const [employeeNumber, setEmployeeNumber] = useState(0);
	const [data, setData] = useState({
		companyName: '',
		companyEmail: '',
		description: '',
		employees: [{}],
	});
	const [companyNameError, setCompanyNameError] = useState('');
	const [companyEmailError, setCompanyEmailError] = useState('');
	const [employeeDataErrors, setEmployeeDataErrors] = useState([]);

	const handleEmployeeNumberInput = (e) => {
		const newValue = parseInt(e.target.value, 10);
		setEmployeeNumber(newValue);
		if (newValue > data.employees.length) {
			for (let i = data.employees.length; i < newValue; i++) {
				addEmployee();
			}
		} else if (newValue < data.employees.length) {
			setEmployeeNumber(e.target.value);
			const difference = data.employees.length - newValue;
			for (let i = 0; i < difference; i++) {
				handleRemoveEmployeeNumber(e);
			}
		}
	};

	const addEmployee = () => {
		setData((prevData) => {
			const newEmployee = {
				id: uuidv4(),
				employeeName: '',
				employeeEmail: '',
				jobTitle: '',
				employeeAge: null,
			};
			return {
				...prevData,
				employees: [...prevData.employees, newEmployee],
			};
		});
	};

	const handleRemoveEmployeeNumber = (e) => {
		const newValue = parseInt(e.target.value, 10);
		setEmployeeNumber(e.target.value);
		if (newValue < data.employees.length) {
			setData((prevData) => {
				return {
					...prevData,
					employees: prevData.employees.slice(0, newValue),
				};
			});
		}
	};

	const isCompanyDataValid = async () => {
		try {
			await companyDataValidationSchema.validate(data, { abortEarly: false });
			setCompanyNameError('');
			setCompanyEmailError('');
			return true;
		} catch (err) {
			err.inner.forEach((error) => {
				if (error.path === 'companyName') {
					setCompanyNameError(error.message);
				}
				if (error.path === 'companyEmail') {
					setCompanyEmailError(error.message);
				}
			});
			return false;
		}
	};

	const isEmployeeDataValid = async () => {
		const errors = [];
		await Promise.all(
			data.employees.map(async (employee) => {
				try {
					await employeeDataValidationSchema.validate(employee, {
						abortEarly: false,
					});
				} catch (err) {
					for (let i = 0; i < err.inner.length; i++) {
						errors.push({
							employeeId: employee.id,
							path: err.inner[i].params.path,
							message: err.inner[i].message,
						});
					}
				}
			})
		);
		setEmployeeDataErrors(errors);
		return errors.length === 0;
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (employeeNumber === 0) {
			const isCompanyDataValidation = await isCompanyDataValid();
			if (isCompanyDataValidation) {
				console.log(data);
                console.log(JSON.stringify(data));
                alert('You successfully submitted this form.')
			}
		} else if (employeeNumber !== 0) {
			const isCompanyDataValidation = await isCompanyDataValid();
			const isEmployeeDataValidation = await isEmployeeDataValid();
			if (isCompanyDataValidation && isEmployeeDataValidation) {
				console.log(data);
                console.log(JSON.stringify(data));
                alert('You successfully submitted this form.')
			}
		}
	};

	return (
		<div className='mainContainer'>
			<div className='App'>
				<p className='title'>Company Data</p>
				<form className='company_form'>
					<div className='companyName-container'>
						<input
							type='text'
							name='companyName'
							className='companyName'
							placeholder='Company Name'
							value={data.companyName}
							onChange={(e) => {
								setData({ ...data, companyName: e.target.value });
							}}
						/>
						<p className='error-message'>{companyNameError}</p>
					</div>
					<div className='companyEmail-container'>
						<input
							type='text'
							name='companyEmail'
							className='companyEmail'
							placeholder='Company Email'
							value={data.companyEmail}
							onChange={(e) => {
								setData({ ...data, companyEmail: e.target.value });
							}}
						/>
						<p className='error-message'>{companyEmailError}</p>
					</div>
					<input
						type='number'
						className='employeeNumber'
						min='0'
						max='100'
						value={employeeNumber}
						onChange={handleEmployeeNumberInput}
					/>
					<label className='descriptionLabel'>
						Company Description<span className='optional'> (optional)</span>
					</label>
					<textarea
						type='text'
						name='description'
						className='description'
						cols='50'
						rows='30'
						value={data.description}
						onChange={(e) => {
							setData({ ...data, description: e.target.value });
						}}
					/>
					{employeeNumber >= 1 ? (
						<p className='emp_title'>Employee Datas</p>
					) : null}
					{employeeNumber >= 1 ? (
						<EmployeeData
							data={data}
							setData={setData}
							errors={employeeDataErrors}
						/>
					) : null}
					<button
						className='submit'
						onClick={(e) => {
							onSubmit(e);
						}}
					>
						<span className='submitSpan'>Submit</span>
					</button>
				</form>
			</div>
		</div>
	);
}

export default CompanyData;
