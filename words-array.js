/*
DATA:
const dataMap - массив некоторого количества неправильных глаголов.
Значениями этого массива, являются подмассивы английских неправильных глаголов,
со следующей структурой:
[Infinitive, II форма глагола (PAST SIMPLE), III форма глагола (PAST PARTICIPLE), Перевод глагола]

TASK:
Программа представляет собой тренировку неправильных глаголов английского языка,
путем перевода их (!!!)"с русского языка"

Пользователю надо показывать рандомное русское слово из массива + 
рандомную форму неправильного глагола(Infinitive, Past simple, Past participle)
+ количество оставшихся попыток (минимум 3 попытки можно дать)
+ при повторных попытках, подсказки для перевода (о них подробнее ниже)

При первой попытке ввода, подсказка перевода не показывается. При последующих попытках,
подсказка перевода строится из предполагаемого ответа, в котором все несовпавшие символы
скрываются звездочками. 
Например:
Если правильный ответ "driven", а мы ввели "drove", то нужно в подсказке отобразить "dr*ve*"

После того как все попытки закончились - отображается правильный результат
и дальше уже предоставляется новое слово (т.е. фактически программа работает заново)

Если в prompt пользователь нажимает "cancel", то функция возвращает null,
что означает выход из программы

HINT 1: Для помощи, предоставлена функция randNum, которая дает рандомное число от min до max
Например: const num = randNum(0, 50); //- любое число от 0 до 50 включительно.
HINT 2: Как я уже упоминал, проходить посимвольно по строке можно как по массиву,
но изменять эти значения нельзя, т.к. они в read-only.

Пример взаимодействия пользователя с программой:
--> слово "Становиться" в форме "Past simple" (попыток: 3)
<-- become

--> слово "Становиться" в форме "Past simple" (попыток: 2)
    подсказка: bac*me
<-- became
--> Верно! Слово "Становиться" в форме "Past simple" - became

--> слово "Рассказывать" в форме "Infinitive" (попыток: 3)
<-- tell
--> Верно! Слово "Рассказывать" в форме "Infinitive" - tell

--> слово "Приносить" в форме "Past participle" (попыток: 3)
<-- bring
--> слово "Приносить" в форме "Past participle" (попыток: 2)
    подсказка: br*****    
<-- braught
--> слово "Приносить" в форме "Past participle" (попыток: 1)
    подсказка: br*ught 
--> breught
--> Запомните, слово "Приносить" в форме "Past participle" - brought

--> слово "Дуть" в форме "Past participle" (попыток: 3)
...

*/

function randNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const dataMap = [
  ["be", "was, were", "been", "Быть"],
  ["beat", "beat", "beaten", "Бить"],
  ["become", "became", "become", "Становиться"],
  ["begin", "began", "begun", "Начинать"],
  ["bleed", "bled", "bled", "Кровоточить"],
  ["blow", "blew", "blown", "Дуть"],
  ["break", "broke", "broken", "Ломать"],
  ["bring", "brought", "brought", "Приносить"],
  ["build", "built", "built", "Строить"],
  ["burn", "burnt", "burnt", "Гореть"],
  ["burst", "burst", "burst", "Взрываться"],
  ["buy", "bought", "bought", "Покупать"],
  ["catch", "caught", "caught", "Ловить, хватать, успеть"],
  ["choose", "chose", "chosen", "Выбирать"],
  ["come", "came", "come", "Приходить"],
  ["cost", "cost", "cost", "Стоить"],
  ["creep", "crept", "crept", "Ползать"],
  ["cut", "cut", "cut", "Резать"],
  ["do", "did", "done", "Делать"],
  ["draw", "drew", "drawn", "Рисовать, тащить"],
  ["dream", "dreamt", "dreamt", "Мечтать, дремать"],
  ["drink", "drank", "drunk", "Пить"],
  ["drive", "drove", "driven", "Водить (машину)"],
  ["eat", "ate", "eaten", "Есть"],
  ["fall", "fell", "fallen", "Падать"],
  ["feed", "fed", "fed", "Кормить"],
  ["feel", "felt", "felt", "Чувствовать"],
  ["fight", "fought", "fought", "Бороться"],
  ["find", "found", "found", "Находить"],
  ["fit", "fit", "fit", "Подходить по размеру"],
  ["fly", "flew", "flown", "Летать"],
  ["forget", "forgot", "forgotten", "Забывать"],
  ["forgive", "forgave", "forgiven", "Прощать"],
  ["freeze", "froze", "frozen", "Замерзать"],
  ["get", "got", "got", "Получать"],
  ["give", "gave", "given", "Давать"],
  ["go", "went", "gone", "Идти"],
  ["grow", "grew", "grown", "Расти"],
  ["hang", "hung", "hung", "Вешать"],
  ["have", "had", "had", "Иметь"],
  ["hear", "heard", "heard", "Слышать"],
  ["hide", "hid", "hidden", "Прятать"],
  ["hit", "hit", "hit", "Попадать в цель"],
  ["hold", "held", "held", "Держать"],
  ["hurt", "hurt", "hurt", "Причинить боль"],
  ["keep", "kept", "kept", "Держать (хранить)"],
  ["kneel", "knelt", "knelt", "Стоять на коленях"],
  ["know", "knew", "known", "Знать"],
  ["lay", "laid", "laid", "Класть"],
  ["lead", "led", "led", "Вести"],
  ["lean", "leant", "leant", "Наклоняться"],
  ["learn", "learnt", "learnt", "Учить"],
  ["leave", "left", "left", "Оставлять"],
  ["lend", "lent", "lent", "Давать взаймы (деньги)"],
  ["let", "let", "let", "Позволять"],
  ["lie", "lay", "lain", "Лежать"],
  ["light", "lit", "lit", "Освещать"],
  ["lose", "lost", "lost", "Терять"],
  ["make", "made", "made", "Производить"],
  ["mean", "meant", "meant", "Значить"],
  ["meet", "met", "met", "Встречать"],
  ["mistake", "mistook", "mistaken", "Ошибаться"],
  ["pay", "paid", "paid", "Платить"],
  ["prove", "proved", "proven", "Доказывать"],
  ["put", "put", "put", "Положить"],
  ["quit", "quit", "quit", "Покидать (бросать)"],
  ["read", "read", "read", "Читать"],
  ["ride", "rode", "ridden", "Ездить верхом"],
  ["ring", "rang", "rung", "Звенеть"],
  ["rise", "rose", "risen", "Подниматься"],
  ["run", "ran", "run", "Бежать"],
  ["say", "said", "said", "Говорить"],
  ["see", "saw", "seen", "Видеть"],
  ["seek", "sought", "sought", "Искать"],
  ["sell", "sold", "sold", "Продавать"],
  ["send", "sent", "sent", "Посылать"],
  ["set", "set", "set", "Ставить"],
  ["sew", "sewed", "sewn", "Шить"],
  ["shake", "shook", "shaken", "Встряхивать"],
  ["show", "showed", "shown", "Показывать"],
  ["shrink", "shrank", "shrunk", "Сжиматься"],
  ["shut", "shut", "shut", "Закрывать"],
  ["sing", "sang", "sung", "Петь"],
  ["sink", "sank", "sunk", "Тонуть"],
  ["sit", "sat", "sat", "Сидеть"],
  ["sleep", "slept", "slept", "Спать"],
  ["slide", "slid", "slid", "Скользить"],
  ["sow", "sowed", "sown", "Сеять"],
  ["speak", "spoke", "spoken", "Говорить"],
  ["spell", "spelt", "spelt", "Произносить по буквам"],
  ["spend", "spent", "spent", "Тратить"],
  ["spill", "spilt", "spilt", "Проливать"],
  ["spoil", "spoilt", "spoilt", "Портить"],
  ["spread", "spread", "spread", "Расстилать"],
  ["spring", "sprang", "sprung", "Прыгать"],
  ["stand", "stood", "stood", "Стоять"],
  ["steal", "stole", "stolen", "Красть"],
  ["stick", "stuck", "stuck", "Колоть"],
  ["sting", "stung", "stung", "Жалить"],
  ["sweep", "swept", "swept", "Выметать"],
  ["swell", "swelled", "swollen", "Разбухать"],
  ["swim", "swam", "swum", "Плавать"],
  ["swing", "swung", "swung", "Качать"],
  ["take", "took", "taken", "Брать, взять"],
  ["teach", "taught", "taught", "Учить"],
  ["tear", "tore", "torn", "Рвать"],
  ["tell", "told", "told", "Рассказывать"],
  ["think", "thought", "thought", "Думать"],
  ["throw", "threw", "thrown", "Бросать"],
  ["understand", "understood", "understood", "Понимать"],
  ["wake", "woke", "woken", "Просыпаться"],
  ["wear", "wore", "worn", "Носить (одежду)"],
  ["weep", "wept", "wept", "Плакать"],
  ["wet", "wet", "wet", "Мочить"],
  ["win", "won", "won", "Выигрывать"],
  ["wind", "wound", "wound", "Извиваться"],
  ["write", "wrote", "written", "Писать"],
];
