let money,
		time,
		startCalcBtn = document.getElementById('start'),	//Начать расчет

		budgetVal = document.querySelector('.budget-value'),	//Доход:
		daybudgetVal = document.querySelector('.daybudget-value'),	//Бюджет на 1 день:
		levelVal = document.querySelector('.level-value'),	//Уровень дохода:
		expensesVal = document.querySelector('.expenses-value'),	//Обязательные расходы:
		optionalexpensesVal = document.querySelector('.optionalexpenses-value'),	//Возможные траты:
		incomeVal = document.querySelector('.income-value'),	//Дополнительный доход:
		monthsavingsVal = document.querySelector('.monthsavings-value'),	//Накопления за 1 месяц:
		yearsavingsVal = document.querySelector('.yearsavings-value'),	//Накопления за 1 год:

		expensesItem = document.querySelectorAll('.expenses-item'),	//Введите обязательные расходы
		expensesItemBtn = document.querySelector('.expenses-item-btn'),

		optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),	//Введите необязательные расходы
		optionalexpensesBtn = document.querySelector('.optionalexpenses-btn'),

		countBudgetBtn = document.querySelector('.count-budget-btn'),	//Расчет дневного бюджета

		chooseIncome = document.getElementById('income'),	//Введите статьи возможного дохода через запятую

		saving = document.getElementById('savings'),	//Есть ли накопления: чекбокс
		chooseSum = document.querySelector('.choose-sum'),	//Сумма
		choosePercent = document.querySelector('.choose-percent'),	//Процент

		year = document.querySelector('.year-value'),
		month = document.querySelector('.month-value'),
		day = document.querySelector('.day-value');


startCalcBtn.addEventListener('click', () => {
	time = prompt('Введите дату в формате YYYY-MM-DD', '2000-12-31');
	while (time == '' || time == null) {
		time = prompt('Введите дату в формате YYYY-MM-DD', '2000-12-31');
	}

	money = +prompt('Ваш бюджет на месяц?', '10000');
	while (isNaN(money) || money == '' || money == null) {
		money = +prompt('Ваш бюджет на месяц?', '10000');
	}

	appData.budget = money;
	appData.timeData = time;
	budgetVal.textContent = money.toFixed();
	year.value = new Date(Date.parse(time)).getFullYear();
	month.value = new Date(Date.parse(time)).getMonth() + 1;
	day.value = new Date(Date.parse(time)).getDate();
	expensesItemBtn.removeAttribute('disabled');
	optionalexpensesBtn.removeAttribute('disabled');
	countBudgetBtn.removeAttribute('disabled');
	saving.removeAttribute('disabled');
});

expensesItemBtn.addEventListener('click', () => {
	let sum = 0;
	for (let i = 0; i < expensesItem.length; i++) {
		let a = expensesItem[i].value,
				b = expensesItem[++i].value;
		if ((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null
			&& a != '' && b != '' && a.length < 50) {
			appData.expenses[a] = b;
			sum += +b;
		}
		else {
			i = i - 1;
		}
	}
	expensesVal.textContent = sum;
	appData.sum = sum;
});

optionalexpensesBtn.addEventListener('click', () => {
	for (let i = 0; i < optionalexpensesItem.length; i++) {
		let c = optionalexpensesItem[i].value;
		if ((typeof(c)) === 'string' && (typeof(c)) != null && c != '') {
			appData.optionalExpenses[i] = c;
			optionalexpensesVal.textContent += appData.optionalExpenses[i] + ' / ';
		}
	}
});

countBudgetBtn.addEventListener('click', () => {
	if (appData.budget != undefined) {
		appData.moneyPerDay = ((appData.budget - appData.sum) / 30).toFixed();
		daybudgetVal.textContent = appData.moneyPerDay;

		if (appData.moneyPerDay < 200) {
			levelVal.textContent = 'Ваши обязательные расходы, возможно, не такие и обязательные?';
		}
		else if (appData.moneyPerDay < 1000 && appData.moneyPerDay > 200) {
			levelVal.textContent = 'Низкий уровень дохода';
		}
		else if (appData.moneyPerDay > 1000 && appData.moneyPerDay < 2000) {
			levelVal.textContent = 'Средний уровень дохода';
		}
		else if (appData.moneyPerDay > 2000) {
			levelVal.textContent = 'Высокий уровень дохода';
		}
		else {
			daybudgetVal.textContent = 'Обязательные расходы не указаны';
			levelVal.textContent = 'Укажите обязательные расходы';
		}
	}
});

chooseIncome.addEventListener('input', () => {
	let items = chooseIncome.value;
	if ((typeof(items)) === 'string' && (typeof(items)) != null && items != '' && items.length < 30) {
		appData.income = items.split(', ');
		incomeVal.textContent = appData.income;
	}
	if (chooseIncome == '') {
		incomeVal.innerHTML = '';
	}
});

saving.addEventListener('click', () => {
	if (appData.savings == true) {
		appData.savings = false;
	}
	else {
		appData.savings = true;
	}
});

chooseSum.addEventListener('input', () => {
	if (appData.savings == true) {
		let sum = +chooseSum.value,
				persent = +choosePercent.value;

		appData.mounthIncome = sum / 100 / 12 * persent;
		appData.yearIncome = sum / 100 * persent;

		monthsavingsVal.textContent = appData.mounthIncome.toFixed(1);
		yearsavingsVal.textContent = appData.yearIncome.toFixed(1);
	}
});

choosePercent.addEventListener('input', () => {
	if (appData.savings == true) {
		let sum = +chooseSum.value,
				persent = +choosePercent.value;

		appData.mounthIncome = sum / 100 / 12 * persent;
		appData.yearIncome = sum / 100 * persent;

		monthsavingsVal.textContent = appData.mounthIncome.toFixed(1);
		yearsavingsVal.textContent = appData.yearIncome.toFixed(1);
	}
});

const appData = {
	"budget": money,
	"timeData": time,
	"expenses": {},
	"optionalExpenses": {},
	"income": [],
	"saving": false
};