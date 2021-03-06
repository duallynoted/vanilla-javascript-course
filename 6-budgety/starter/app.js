//BUDGET CONTROLLER
let budgetController = (function () {
    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value
        this.percentage = -1
    }

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100)
        } else {
            this.percentage = -1
        }
    }

    Expense.prototype.getPercentage = function () {
        return this.percentage
    }

    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    let calculateTotal = function (type) {
        let sum = 0;
        data.allItems[type].forEach((cur) => {
            sum += cur.value
        })
        data.totals[type] = sum;
    }

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    }

    return {
        addItem: function (type, des, val) {
            let newItem, ID;

            //create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1
            } else {
                ID = 0;
            }

            //create new item based on type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }

            //push it into our data structure
            data.allItems[type].push(newItem)

            //return the new element
            return newItem;
        },
        deleteItem: function (type, id) {
            let ids, index;
            ids = data.allItems[type].map((current) => {
                return current.id;
            })
            index = ids.indexOf(id)
            if (index !== -1) {
                data.allItems[type].splice(index, 1)
            }
        },
        calculateBudget: function () {
            let totals = data.totals
            //calculate total inc and exp
            calculateTotal('exp')
            calculateTotal('inc')

            //calculate budget: inc - exp
            data.budget = totals.inc - totals.exp

            //calculate % of income that we've spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((totals.exp / totals.inc) * 100)
            } else {
                data.percentage = -1
            }
        },
        calculatePercentages: function () {
            /*
            a = 20
            b = 10
            c = 40
            income = 100
            a = 20/100 === 20%
            b = 10/100 === 10%
            c = 40/100 === 40%
            */
            data.allItems.exp.forEach((cur) => {
                cur.calcPercentage(data.totals.inc)
            })
        },

        getPercentages: function () {
            let allPerc = data.allItems.exp.map((cur) => {
                return cur.getPercentage()
            })
            return allPerc;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function () {
            console.log(data)
        }
    }
})();

//UI CONTROLLER
let uiController = (function () {
    let DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLable: '.budget__title--month'

    }
    let formatNumber = function (num, type) {
        let numSplit, int, dec;
        num = Math.abs(num)
        num = num.toFixed(2)
        numSplit = num.split('.')

        int = numSplit[0]
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3)
        }
        dec = numSplit[1]

        return (type === 'exp' ? '-' : '+') + '' + int + '.' + dec
    };

    let nodeListForEach = function (list, callBack) {
        for (let i = 0; i < list.length; i++) {
            callBack(list[i], i)
        }
    }
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value, //will be either "inc" or "exp"
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },

        addListItem: function (obj, type) {
            let htmlString, newHTML, element;
            //create html string with placeholder text
            if (type === 'inc') {
                element = DOMStrings.incomeContainer
                htmlString = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div>' +
                    '<div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            }
            if (type === 'exp') {
                element = DOMStrings.expensesContainer
                htmlString = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div>' +
                    '<div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div>' +
                    '<div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                    '</div> </div> </div>'
            }
            //replace the placeholder text with actual data
            newHTML = htmlString.replace('%id%', obj.id)
            newHTML = newHTML.replace('%description%', obj.description)
            newHTML = newHTML.replace('%value%', formatNumber(obj.value, type))

            // insert the html in to the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML)
        },
        deleteListItem: function (selectorID) {
            let el = document.getElementById(selectorID)
            el.parentNode.removeChild(el)
        },

        clearFields: function () {
            let fields, fieldsArray;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue)
            fieldsArray = Array.prototype.slice.call(fields)
            fieldsArray.forEach(function (current, index, array) {
                current.value = ""
            })
            fieldsArray[0].focus()
            console.log(fields, fieldsArray)

        },
        displayBudget: function (obj) {
            let type;
            obj.budget > 0 ? type = 'inc' : type = 'exp'
            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
        },
        displayPercentages: function (percentages) {
            let fields = document.querySelectorAll(DOMStrings.expensesPercLabel)

            nodeListForEach(fields, function (current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%'
                } else {
                    current.textContent = '---'
                }
            })
        },
        displayMonth: function () {
            let now, year, month, months;
            now = new Date()
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMStrings.dateLable).textContent = months[month] + ' ' + year
        },
        changedType: function (type) {
            let fields = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue
            )
            nodeListForEach(fields, function (cur) {
                cur.classList.toggle('red-focus')
            })

            document.querySelector(DOMStrings.inputButton).classList.toggle('red')

        },
        getDOMStrings: function () {
            return DOMStrings;
        }
    }
})()

//GLOBAL APP CONTROLLER
let appController = (function (budgetCtrl, uiCtrl) {
    let setUpEventListeners = function () {
        let DOM = uiCtrl.getDOMStrings() //calling it DOM here. this is the result of the function call, and it is stored in DOM, so below it is DOM.inputButton
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem)
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem()
            }
        })
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)
        document.querySelector(DOM.inputType).addEventListener('change', uiCtrl.changedType)
    }

    let updateBudget = function () {
        //1. Calculate the budget
        budgetController.calculateBudget()
        //2. return the budget
        let budget = budgetController.getBudget()
        //3. Display the budget on the UI
        uiController.displayBudget(budget)
    }
    let updatePercentages = function () {
        //1.calculate percentages
        budgetController.calculatePercentages()
        //2.read them from budget controller
        let percentages = budgetController.getPercentages()

        //3.update the ui
        uiCtrl.displayPercentages(percentages)
    }
    let ctrlAddItem = function () {
        let input, newItem;
        //1. Get the field input data
        input = uiCtrl.getInput()
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. Add item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value)
            //3. Add the new item to the UI
            uiController.addListItem(newItem, input.type)
            //4. clear the filds
            uiController.clearFields()
            //5. Calculate and update budget
            updateBudget()
            //6. Calculate and update percentages
            updatePercentages()
        }
    }
    let ctrlDeleteItem = function (event) {
        let itemId, splitID, type, ID;
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id
        if (itemId) {
            splitID = itemId.split('-')
            type = splitID[0]
            ID = parseInt(splitID[1])

            //delete item from data structure
            budgetController.deleteItem(type, ID)
            //delete item from UI
            uiController.deleteListItem(itemId)
            //update and show the new budget
            updateBudget()
            //Calculate and update percentages
            updatePercentages()
        }
    }

    return {
        init: function () {
            console.log('Application has started.')
            uiCtrl.displayMonth()
            setUpEventListeners()
            uiController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            })
        }
    }
})(budgetController, uiController)

appController.init()

