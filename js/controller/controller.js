  class CalcController {

    constructor() {

        //private attribute
        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector(".display");
        this._dateEl = document.querySelector(".date");
        this._timeEl =  document.querySelector(".time");
        this._currentDate = null;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){
        //data&hora
        this.setDisplayDateTime1();


        setInterval(()=>{

            this.setDisplayDateTime1();

        }, 1000);

        this.setLastNumberToDisplay();

    }

    initKeyboard(){

        document.addEventListener('keyup', e=> {

            console.log(e.key);

        });


    }

    clearAll(){

        this._operation = [];

        this._lastNumber = '';
        this._lastOperator = '';

        this.setLastNumberToDisplay();
    }

    clearEntry(){

        this._operation.pop();

        this.setLastNumberToDisplay();

    }

    getLastOperation(){

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value){

        this._operation[this._operation.length -1] = value;

    }

    isOperator(value) {

        return (['+', '-', '*', '/'].indexOf(value) > -1);

    }

    pushOperation(value){

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();

        }

    }

    getResult(){
        try {
            return eval(this._operation.join(""));
        } catch (e) {
            setTimeout(()=>{
                this.setError();
            },1);

        }
    }

    calc(){

        let last = "";

        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3 ){

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }

        if (this._operation.length > 3){

            last = this._operation.pop();

            this._lastNumber = this.getResult();

        } else if (this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);

        }


        let result = this.getResult();

        this._operation = [result];

        if (last) this._operation.push(last);

        this.setLastNumberToDisplay();

    }

    getLastItem(isOperator = true){

        let lastItem;

        for (let i = this._operation.length -1; i >= 0; i--) {

            if (this.isOperator(this._operation[i]) == isOperator){
            lastItem = this._operation[i];
            break;

            }

        }

        if (!lastItem) {

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }

        return lastItem;
    }

    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }


    addOperation(value){

        console.log('A ', value, isNaN(this.getLastOperation()));

        if (isNaN(this.getLastOperation())){

            if (this.isOperator(value)) {

                this.setLastOperation(value);

            } else if(isNaN(value)) {

                console.log('Outra coisa', value);

            } else {
                //se numero
                this.pushOperation(value);

                this.setLastNumberToDisplay();

            }


        } else {

            if (this.isOperator(value)){

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();

            }

        }


    }

    setError(){

        this.displayCalc = "Error";

    }

    execBtn(value){

       switch (value) {

           case 'C':
               this.clearAll();
               break;

           case 'bksp':
               this.clearEntry();
               break;

           case 'adc':
               this.addOperation('+');
               break;

           case 'sub':
               this.addOperation('-');
               break;

           case 'div':
               this.addOperation('/');
               break;

           case 'tms':
               this.addOperation('*');
               break;

           case 'eql':
               this.calc();
               break;

           case '0':
           case '1':
           case '2':
           case '3':
           case '4':
           case '5':
           case '6':
           case '7':
           case '8':
           case '9':
               this.addOperation(parseInt(value));
               break;

           default:
               this.setError;
               break;

       }

    }


    initButtonsEvents(){
        let buttons = document.querySelectorAll(".keyboard-key");

        buttons.forEach((btn, index)=>{

            btn.addEventListener('click', e => {

                let textBtn = btn.className.replace("keyboard-key btn-", "");

                this.execBtn(textBtn);
            });



        });

    }


    setDisplayDateTime1(){

        this._dateEl.innerHTML = new Date().toLocaleDateString(this._locale);
        this._timeEl.innerHTML = new Date().toLocaleTimeString(this._locale);
    }

    /**setDisplayDateTime2(){
        //this.displayDate = this.currentDate.toLocaleDateString(this._locale); *Não funciona  **funcionou depois de adicionar os eventos de click
        //this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

        calculator.displayDate = new Date().toLocaleDateString(this._locale);
        calculator.displayTime = new Date().toLocaleTimeString(this._locale);
    }**/

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){

        if (value.toString().length > 11) {
            this.setError();
            return false;
        }

        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return this._currentDate;
    }

    set currentDate(value){
        this._currentDate = value;
    }

 }