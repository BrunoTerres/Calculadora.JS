  class CalcController {

    constructor() {

        //private attribute
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


    initButtonsEvents(){
        let buttons = document.querySelectorAll(".keyboard-key");

        buttons.forEach((btn, index)=>{

            btn.addEventListener('click', e => {

                console.log(btn.className.replace("keyboard-key btn-", ""));

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