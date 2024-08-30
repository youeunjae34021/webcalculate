document.addEventListener('DOMContentLoaded', () => {
    let display = document.getElementById('display');
    let calculateList = document.getElementById('calculateList');
    let currentInput = '';
    let calculatelist = [];

    function calculatesee(value) { //계산기의 숫자를 입력받는다 0일 경우 0이 처음으로 입력받은 수로 교체된 후 계산기가 사용되고
        if (display.textContent === '0') {
            display.textContent = value;
        } 
        else if(display.textContent ==="Error") // 잘못입력하여 Error가 떴을때도 위와 같이 error가 처음으로 입력된 value로 대체된다
        {
            display.textContent =value;
        }
        else {
            display.textContent += value;
        }
        
        currentInput = display.textContent;
    }


    function clear() {
        display.textContent = '0';
        currentInput = '';
    }


    function changing(expression) {
        return expression
            .replace(/÷/g, '/')  // 입력은 ÷,×로 받지만 이런 연산자는 없기 때문에 /,*로 변경한 후 계산이 가능하도록 한다
            .replace(/×/g, '*');  
    }

 
    function calculate() { // currentInput속에 들어있는 계산식을 계산 한 후 result안에 너허서 현재 currentInput을 계산식의 결과로 변경한다
        try {
            let convertedInput = changing(currentInput);
            let result = new Function('return ' + convertedInput)();
            display.textContent = result;
            calculatemakelist(currentInput + ' = ' + result);
        } catch {
            display.textContent = 'Error';
        }
        currentInput = display.textContent;
    }

  
    function calculatemakelist(entry) { // 계산했던 기록을 보여줘야 하기 때문에 calculatelist라는 list속에 calculate함수 속에있는 calculatmakelist를 출력한다
        calculatelist.unshift(entry);

        // if (calculatelist.length > 5) {
        //     calculatelist.pop();
        // }

        renderHistory();
    }

   
    function renderHistory() { 
        calculateList.innerHTML = '';
        calculatelist.forEach(entry => {
            let li = document.createElement('li');
            li.textContent = entry;
            calculateList.appendChild(li);
        });
    }

 
    function clearcalculatelist() { // 검색기록도 지울수 있는 함수
        calculatelist = [];
        renderHistory();
    }


    document.querySelectorAll('.buttons button').forEach(button => { // html들의 각각 함수를 작동시키는 상호작용 버튼들을 눌렀을때 이 코드를 통해 함수들을 실행한다
        button.addEventListener('click', (event) => {
            const buttonText = event.target.textContent;
            if (buttonText === 'C') {
                clear();
            } else if (buttonText === '=') {
                calculate();
            } else {
                calculatesee(buttonText);
            }
        });
    });

  
    document.getElementById('clearcalculatelistButton').addEventListener('click', () => { // 이건 계산결과를 보여주는 화면의 값들을 제거하는 함수를 실행한다
        clearcalculatelist();
    });
});