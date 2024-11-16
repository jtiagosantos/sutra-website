import dayjs from "dayjs";

const textsByDay = {
  0: {
    subject: 'É hora de testar seu conhecimento! 🧠📚',
    firstText: 'Que tal reservar um momento hoje para testar seu conhecimento sobre seus livros favoritos e se divertir? 🤩',
    secondText: 'Lembre-se de acessar a plataforma Sutra e fazer seu quiz diário. Cada resposta certa te aproxima ainda mais do topo do ranking dos leitores mais afiados! 🚀',
    thirdText: 'Acesse agora e veja como você se sai hoje!'
  },
  1: {
    subject: 'Seu quiz diário já está esperando por você! 🎯📖',
    firstText: 'Pronto para mais um desafio? O quiz de hoje na plataforma Sutra já está disponível, esperando por suas respostas. Não deixe de testar seu conhecimento e subir no ranking! 📈✨',
    secondText: 'Cada quiz é uma nova chance de se destacar entre os melhores leitores. 😎',
    thirdText: 'Clique aqui e comece agora!'
  },
  2: {
    subject: 'Hoje é dia de quiz literário! Prepare-se! 💥📖',
    firstText: 'O quiz de hoje na plataforma Sutra está pronto para testar seus conhecimentos literários! 📚',
    secondText: 'Será que você consegue acertar todas as perguntas e alcançar uma nova posição no ranking? 🎯🤩',
    thirdText: 'Não deixe para depois, acesse agora e mostre o quanto sabe sobre seus livros favoritos!'
  },
  3: {
    subject: 'Seu próximo desafio te espera na plataforma Sutra! 🌟📚',
    firstText: 'Pronto para testar seus conhecimentos e subir no ranking? 🏆',
    secondText: 'O quiz de hoje já está disponível e mal podemos esperar para ver o quanto você sabe! 🔥',
    thirdText: 'Entre agora mesmo e veja se consegue acertar todas as perguntas sobre os livros que você ama!'
  },
  4: {
    subject: 'Não se esqueça do seu quiz de hoje! 🌟📖',
    firstText: 'Já garantiu seu quiz do dia? 🤔 Não perca a chance de testar seus conhecimentos literários hoje na plataforma Sutra.',
    secondText: 'Desafie-se, acumule pontos e veja até onde pode chegar no ranking! 🏅',
    thirdText: 'Acesse agora e comece seu quiz!'
  },
  5: {
    subject: 'Pronto para mais um quiz literário? 🕵️‍♂️📖',
    firstText: 'Seu próximo desafio na plataforma Sutra está te esperando! 🎯',
    secondText: 'Prepare-se para desvendar as perguntas e acumular pontos preciosos. Cada acerto te leva um passo mais perto do topo do ranking! 🏆',
    thirdText: 'Está na hora de mostrar todo o seu conhecimento. Vamos nessa?'
  },
  6: {
    subject: 'Pronto para desbloquear o conhecimento de hoje? 🔓📚',
    firstText: 'Que tal aproveitar o sábado para relaxar e testar seus conhecimentos literários? 🤩',
    secondText: 'A plataforma Sutra está te esperando com um quiz especial para você. 🎯',
    thirdText: 'Acesse agora e divirta-se!'
  },
}

export const getDailyRemainderTexts = () => {
  const day = dayjs().day();

  return textsByDay[day];
}