const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {
    try {
      MyUtils.Console.print("업다운 게임을 시작합니다.\n");
      const version = await this.versionChoice(); 

      if (version === '1') {
        await this.numberVersion();
      } else if (version === '2') {
        await this.alphabetVersion();
      } else {
        MyUtils.Console.print("[ERROR] 존재하지 않는 버전입니다.");
      }
    } catch (error) {
      throw new Error(`[ERROR] ${error.message}`);
    }
  }

  async versionChoice() {
    MyUtils.Console.print("버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2) : ");
    const version = await MyUtils.Console.readLineAsync();
    return version;
  }

  async numberVersion() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let isCorrect = false;
    let tryCount = 0;
    let minRange = 1; 
    let maxRange = 100; 

    while (!isCorrect) {
      MyUtils.Console.print(`숫자를 입력해주세요(${minRange} ~ ${maxRange}) : `); 
      const userInput = await MyUtils.Console.readLineAsync();
      tryCount++;
      
      if (userInput >= minRange && userInput <= maxRange) { 
        if (parseInt(userInput) === randomNumber) {
          MyUtils.Console.print("정답!");
          MyUtils.Console.print(`시도 횟수: ${tryCount}`);
          isCorrect = true;
        } else if (parseInt(userInput) > randomNumber) {
          MyUtils.Console.print("DOWN");
          maxRange = parseInt(userInput) - 1; 
        } else {
          MyUtils.Console.print("UP");
          minRange = parseInt(userInput) + 1; 
        }
      } else {
        MyUtils.Console.print("[ERROR] 입력 문자의 타입이 맞지 않거나 범위를 벗어났습니다.");
      }
    }
  }

  async alphabetVersion() {
    const alphabetList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const randomAlphabet = alphabetList.charAt(Math.floor(Math.random() * alphabetList.length));

    let isCorrect = false;
    let tryCount = 0;
  
    MyUtils.Console.print(`영어를 입력해주세요(A~z) : `);
  
    while (!isCorrect) {
        const userInput = await MyUtils.Console.readLineAsync();
        tryCount++;
        const parsedInput = userInput.trim();
  
        if (parsedInput.length === 1 && alphabetList.includes(parsedInput)) {
            if (parsedInput === randomAlphabet) {
                 MyUtils.Console.print("정답!");
                 isCorrect = true;
                 MyUtils.Console.print(`시도 횟수: ${tryCount}`);
            } else if (parsedInput > randomAlphabet) {
                MyUtils.Console.print("DOWN");
              } else {
                MyUtils.Console.print("UP");
              }
          } else {
              MyUtils.Console.print("[ERROR] 범위 내의 알파벳을 입력하세요.\n");
            }
      }
  }
  
}

module.exports = App;
