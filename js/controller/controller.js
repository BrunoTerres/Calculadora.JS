  class CalcController {

    constructor() {

        //private attribute
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

        this.setDisplayDateTime1();


        setInterval(()=>{

            this.setDisplayDateTime1();

        }, 1000);

    }

    clearAll(){

        this._operation = [];

    }

    clearEntry(){

        this._operation.pop();

    }

    getLastOperation(){

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value){

        this._operation[this._operation.length -1] = value;

    }

    isOperator(value) {

        return (['+', '-', 'x', '÷'].indexOf(value) > -1);

    }


    addOperation(value){

        console.log('A ', isNaN(this.getLastOperation()));

        if (isNaN(this.getLastOperation())){

            if (this.isOperator(value)) {

                this.setLastOperation(value);

            } else if(isNaN(value)) {

                console.log(value);

            } else {

                this._operation.push(value);

            }


        } else {
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue));

        }


        console.log(this._operation);

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
               this.addOperation('÷');
               break;

           case 'tms':
               this.addOperation('x');
               break;

           case 'eql':

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
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return this._currentDate;
    }

    set currentDate(value){
        this._currentDate = value;
    }

 }