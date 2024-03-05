import { useState } from 'react' // Импортируем хук useState из библиотеки React
import './App.css' // Импортируем файл стилей

const App = () => {
	// Состояния для хранения введенных пользователем данных и результата расчета
	const [height, setHeight] = useState('')
	const [weight, setWeight] = useState('')
	const [age, setAge] = useState('')
	const [gender, setGender] = useState('male') // По умолчанию выбран мужской пол
	const [activityLevel, setActivityLevel] = useState('minimal') // По умолчанию выбран минимальный уровень активности
	const [count, setCount] = useState(0) // Начальное значение результата равно 0

	// Обработчики изменения значений полей ввода
	const handleHeightChange = e => {
		setHeight(e.target.value)
	}

	const handleWeightChange = e => {
		setWeight(e.target.value)
	}

	const handleAgeChange = e => {
		setAge(e.target.value)
	}

	const handleGenderChange = e => {
		setGender(e.target.value)
	}

	const handleActivityLevelChange = e => {
		setActivityLevel(e.target.value)
	}

	// Функция расчета калорий
	function calculateCalories() {
		// Логика расчета калорий на основе введенных данных
		let BMR
		if (gender === 'male') {
			BMR = 10 * weight + 6.25 * height - 5 * age + 5
		} else {
			BMR = 10 * weight + 6.25 * height - 5 * age - 161
		}

		// Множитель активности в зависимости от выбранного уровня активности
		let activityMultiplier
		switch (activityLevel) {
			case 'minimal':
				activityMultiplier = 1.2
				break
			case 'low':
				activityMultiplier = 1.375
				break
			case 'medium':
				activityMultiplier = 1.55
				break
			case 'high':
				activityMultiplier = 1.725
				break
			case 'veryHigh':
				activityMultiplier = 1.9
				break
			default:
				activityMultiplier = 1.2
		}

		// Расчет суточной нормы калорий и округление до целого числа
		const dailyCalories = Math.round(BMR * activityMultiplier)
		return dailyCalories
	}

	// Обработчик отправки формы
	const handleFormSubmit = e => {
		e.preventDefault() // Предотвращаем стандартное действие отправки формы
		const result = calculateCalories() // Рассчитываем калории
		setCount(result) // Обновляем состояние с результатом
	}

	// Возвращаем JSX-разметку для отображения формы и результата расчета
	return (
		<div className='container'>
			<h2 className='title'>Суточная норма калорий</h2>
			<form onSubmit={handleFormSubmit} className='form'>
				{/* Поля ввода для роста, веса, возраста, пола и уровня активности */}
				<div className='form-group'>
					<label>Рост (см):</label>
					<input type='number' value={height} onChange={handleHeightChange} />
				</div>
				<div className='form-group'>
					<label>Вес (кг):</label>
					<input type='number' value={weight} onChange={handleWeightChange} />
				</div>
				<div className='form-group'>
					<label>Возраст:</label>
					<input type='number' value={age} onChange={handleAgeChange} />
				</div>
				<div className='form-group'>
					<label>Пол:</label>
					<select value={gender} onChange={handleGenderChange}>
						<option value='male'>Мужской</option>
						<option value='female'>Женский</option>
					</select>
				</div>
				<div className='form-group'>
					<label>Уровень активности:</label>
					<select value={activityLevel} onChange={handleActivityLevelChange}>
						<option value='minimal'>Минимальный</option>
						<option value='low'>Низкий</option>
						<option value='medium'>Средний</option>
						<option value='high'>Высокий</option>
						<option value='veryHigh'>Очень высокий</option>
					</select>
				</div>
				<button type='submit'>Рассчитать</button>
			</form>
			{/* Отображение результата расчета */}
			<p className='count_text'>Примерная суточная норма калорий</p>
			<div className='count_container'>
				<h1>{count}</h1>
			</div>
			{/* Дополнительная информация или авторские данные */}
			<p className='autor'>Проект Мулюкова Амира</p>
		</div>
	)
}

export default App
