class Calculator{
	constructor(){
		this.previousScreen = document.getElementById('prev')
		this.currentScreen = document.getElementById('curr')
		this.clearAll()
		document.addEventListener('click', this.handleAction.bind(this))
	}
	handleAction(e){
		if( e.target.hasAttribute('data-number') ){
			this.appendNumber(e.target.dataset.value)
		}
		if( e.target.hasAttribute('data-operand') ){
			this.appendOperand(e.target.dataset.value)
		}
		if( e.target.hasAttribute('data-decimal') ){
			this.appendDecimal(e.target.dataset.value)
		}
		if( e.target.hasAttribute('data-open') ){
			this.openBrackets(e.target.dataset.value)
		}
		if( e.target.hasAttribute('data-close') ){
			this.closeBrackets(e.target.dataset.value)
		}
		if( e.target.hasAttribute('data-equals') ){
			this.calculate()
		}
		if( e.target.hasAttribute('data-clear') ){
			this.clear()
		}
		if( e.target.hasAttribute('data-clear-all') ){
			this.clearAll()
		}
	}
	appendNumber(value){
		let arr = this.currentScreen.textContent.split('')
		let canAppend = ( arr[arr.length - 1] !== ')' )
		if( canAppend ){
			let wrapIsNeeded = ( isNaN(Number(arr[arr.length - 1])) && arr[arr.length - 1] !== '.' && !( arr.includes('(') && !arr.includes(')') ) )
			if( wrapIsNeeded ){
				this.previousScreen.textContent += this.currentScreen.textContent
				this.currentScreen.textContent = value
			}else{
				this.currentScreen.textContent += value
			}
		}
	}
	appendOperand(value){
		let arr = this.currentScreen.textContent.split('')
		let canAppend = ( arr.length && arr[arr.length - 1] !== '(' )
		if( canAppend ){
			let hasToChangge = ( isNaN(Number(arr[arr.length - 1])) && arr[arr.length - 1] !== '.' && arr[arr.length - 1] !== '(' && arr[arr.length - 1] !== ')' )
			if( hasToChangge ){
				arr.pop()
				this.currentScreen.textContent = arr.join('') + value
			}else{
				this.currentScreen.textContent += value
			}
		}
	}
	appendDecimal(value){
		let arr = this.currentScreen.textContent.split('')
		let canAppend = ( arr.length && !isNaN(Number(arr[arr.length - 1])) && !arr.includes('.') )
		if( canAppend ){
			this.currentScreen.textContent += value
		}
	}
	openBrackets(value){
		let arr = this.currentScreen.textContent.split('')
		let canAppend = ( isNaN(Number(arr[arr.length - 1])) && arr[arr.length - 1] !== '.' && arr[arr.length - 1] !== ')' && !arr.includes('(') )
		if( canAppend ){
			this.currentScreen.textContent += value
		}
	}
	closeBrackets(value){
		let arr = this.currentScreen.textContent.split('')
		let canAppend = ( arr.length && arr.includes('(') && !isNaN(Number(arr[arr.length - 1])) )
		if( canAppend ){
			this.currentScreen.textContent += value
		}
	}
	calculate(){
		if( !this.currentScreen.textContent || !this.previousScreen.textContent ) return
		let str = this.previousScreen.textContent + this.currentScreen.textContent
		let result = eval(str)
		this.previousScreen.textContent = ''
		this.currentScreen.textContent = result
	}
	clear(){
		let arr = this.currentScreen.textContent.split('')
		arr.pop()
		this.currentScreen.textContent = arr.join('')
	}
	clearAll(){
		this.currentScreen.textContent = ''
		this.previousScreen.textContent = ''
	}
}
function ready(){
	let calculator = new Calculator()
	calculator.clearAll()
}
ready()
