const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {
    try {
      MyUtils.Console.print("업다운 게임을 시작합니다.");
      const version = await this.versionCheck();

      if (version == 1) {
        await this.numCheck();
      } else await this.alphaCheck();

      // <공통>
      // 버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2) :
      // 숫자(1) or 영어(2)
      // <예외>: 1, 2 외의 숫자 입력 시
      // [ERROR] 존재하지 않는 버전입니다.

      // 난수와 입력숫자가 일치할 때까지 반복
      // 난수와 입력숫자가 일치하면 "정답!" 출력 후 종료
      // 시도한 횟수 출력 (try_count)
      // 시도한 횟수 : `${try_count}회`

      // <숫자>
      // 1. 난수 생성 ( AnswerNum ) Math.Random() 사용
      // 2. 숫자를 입력받는다 (InputNum)
      // 2-1. <예외> : 숫자 범위 ( 1 ~ 100 )가 아닐 시
      // [ERROR] 범위 내의 숫자를 입력하세요.

      // [ERROR] 입력 문자의 타입이 맞지 않습니다.

      // 3. 난수와 입력받은 숫자를 비교하여
      // 난수  < 입력숫자  DOWN
      // 난수  > 입력숫자  UP

      // <영어>
      // 1. 난수 생성 (AnswerAlphabet) 대문자와 소문자 사이의 알파벳 임의 선택
      // 2. 영어를 입력받는다
      // 2-1. <예외> : 영어 범위 ( A ~ Z ) 가 아닐 시
      // [ERROR] 범위 내의 알파벳을 입력하세요.
      // 3. 난수와 입력받은 영어(InputAlphabet)를 비교하여
      // 난수 < 입력값 DOWN
      // 난수 > 입력값 UP
    } catch (error) {
      throw new Error(`[ERROR] ${error.message}`);
    }
  }

  async versionCheck() {
    MyUtils.Console.print("버전을 입력해주세요. (숫자 버전: 1, 영어 버전: 2) ");
    const version = await MyUtils.Console.readLineAsync();
    if (!(version == 1 || version == 2)) {
      // throw new error("[ERROR] 존재하지 않는 버전입니다.");
      MyUtils.Console.print("[ERROR] 존재하지 않는 버전입니다.");
    }
    return version;
  }

  async numCheck() {
    MyUtils.Console.print("숫자를 입력해주세요(1 ~ 100) :");
    const answerNum = Math.floor(Math.random() * 101);
    console.log(answerNum);
    let InputNum = await MyUtils.Console.readLineAsync();
    //예외
    if (!(1 <= InputNum && InputNum <= 100)) {
      throw new error("[ERROR] 범위 내의 숫자를 입력하세요.");
    }

    await this.compareUntilMatch(answerNum, InputNum);
    return answerNum;
  }

  async alphaCheck() {
    MyUtils.Console.print("영어를 입력해주세요(A ~ z) :");
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const answerIndex = Math.floor(Math.random() * alphabet.length);
    const answerAlphabet = alphabet.charAt(answerIndex);
    let InputAlphabet = await MyUtils.Console.readLineAsync();

    //예외
    if (InputAlphabet) {
      throw new error("[ERROR] 범위 내의 알파벳을 입력해주세요(A ~ z) : ");
    }
    await this.compareUntilMatch(answerAlphabet, InputAlphabet);
    return answerAlphabet;
  }

  //정답 리턴
  async generateAnswer(version) {
    return version == 1 ? answerNum : answerAlphabet;
  }

  //입력값과 난수 비교
  async compareUntilMatch(answer, input) {
    let try_count = 0;

    while (true) {
      if (answer < input) {
        MyUtils.Console.print("DOWN");
      } else if (answer > input) {
        MyUtils.Console.print("UP");
      }

      if (answer < input) {
        MyUtils.Console.print(`숫자를 입력해주세요(1 ~ ${input - 1} ) :`);
      } else
        MyUtils.Console.print(
          `숫자를 입력해주세요(${parseInt(input) + 1} ~ 100) : `
        );
      // 범위 내 숫자가 아닐 시 예외 처리
      input = await MyUtils.Console.readLineAsync();
      try_count++;

      if (answer == input) break;
    }

    MyUtils.Console.print("정답!");
    MyUtils.Console.print(`시도한 횟수 : ${try_count}회`);
  }
}

module.exports = App;
