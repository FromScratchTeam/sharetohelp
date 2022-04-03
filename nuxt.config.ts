import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  buildModules: ['@intlify/nuxt3'],
  css: [
    '~/assets/styles/style.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/_mq.scss";',
        },
      },
    },
  },
  
  intlify: {
    vueI18n: {
      locale: 'ua',
      messages: {
        ua: {
          generalMessage: 'Проект <b>Share Help</b> не перевірить контент. Ми вважаємо, що найкращим способом переконатися, що людям дійсно потрібна допомога – це написати їм безпосередньо.',
          whoNeedsHelp: 'Хто потребує допомоги',
          aboutUs: 'Докладнiше про нас',
          iNeedHelp: 'Мені потрібна допомога',
          myStory: 'Моя історія',
          loading: 'Завантаження...',
          projectAppeared: 'Проект щойно з’явився.<br /> Історій поки немає',
          readMore: 'Детальніше',
          yourStory: 'Твоя icторiя...',
          next: 'Далi',
          publish: 'Опублікувати',
          enterTelegramUsername: 'Вкажіть свій Telegram',
          telegramDescription: 'Проект <b>Share help</b> не займаеться перевiркою контенту. Ми вважаэмо що найлiбшим способом упевнитись що вам дiйсно потрiбна допомога - залишити свої контакти для звв\'язку. В такому випадку той, хто дiйсно хоче допомогти, зможе вам написати, а пiсля зробити пожертвування.',
          aboutusTitles: [
            'Share to Help',
            'Кому допомагаємо?',
            'Чи можуть шахраї користуватися сайтом?',
            'Як допомогти?'
          ],
          aboutusParahprahs: [
            'Платформа, створена небайдужими людьми, для допомоги громадянам України, постраждалим пiд час военних дiй на території України.',
            'Громадянам України постраждалим від військових дій на території України і тих, хто зараз залишився без даху над головою і без засобів існування. Дуже багато людей зараз ховаються по підвалах та станціях метро. У когось не вистачає ліків, у когось не вистачає їжі. І лише всі разом, спільними зусиллями, ми можемо допомогти...',
            'На жаль ми не можемо виключити варіанти реєстрації шахраїв і тому рекомендуємо після ознайомлення з анкетою на головній сторінці,зв\'язатися з людиною якій хочете зробити пожертвування.',
            'Наразі матеріальної допомоги потребує переважна більшість громадянин України. На головному екрані ви можете знайти анкети людей, які потребують допомоги як ніколи раніше і будь-який переказ коштів допоможе їм.'
          ],
          delete: 'Видалити',
          postDeleted: 'Запис видалено',
          bankCard: 'Банківська картка',
          cryptocurrency: 'Криптовалюта',
          storyPublished: 'Історія опублікована',
          invalidCardNumber: 'Невірно вказано номер картки',
          selectNetwork: 'Виберіть мережу',
          insertCryptoWalletAddress: 'Вставте адресу криптогаманця',
          fillPage: 'Заповніть цю сторінку',
          telegramUsernameIsInvalid: 'Ви можете використовувати a-z, 0-9 і підкреслення. Мінімальна довжина – 5 символів',
          enterCryptoOrCardnumber: 'Вкажіть номер картки або адресу криптогаманця',
          cardNumberTooShort: 'Номер картки повинен містити 16 символів',
          notSupportedCardNumber: 'Карта має бути випущена Українським банком',
          creationLimitExceeded: 'Ви вже створювали запис',
          notFilled: 'Не заповнено',
          cardNumber: 'Номер картки',
          network: 'Мережа',
          address: 'Адреса',
          cardNumberCopied: 'Номер карти скопійовано',
          addressCopied: 'Адреса скопійовано',
          enterYourCardNumber: 'Напишіть номер картки...',
          insertAddress: 'Вставте адресу...',
          getHelpTitle: 'Як би ви хотіли отримати допомогу?'
        },
        en: {
          generalMessage: 'The <b>Share Help</b> project does not review content. We believe that the best way to make sure people really need help is to write to them directly.',
          whoNeedsHelp: 'Who needs help',
          aboutUs: 'About us',
          iNeedHelp: 'I need help',
          myStory: 'My story',
          loading: 'Loading...',
          projectAppeared: 'The project has just appeared.<br /> No stories yet',
          readMore: 'Read more',
          yourStory: 'Your story...',
          next: 'Next',
          publish: 'Publish',
          enterTelegramUsername: 'Enter your Telegram username',
          telegramDescription: 'The <b>Share help</b> project does not validate content. We believe that the best way to make sure you really need help is to keep in touch. In that case, someone who really wants to help will be able to write to you and then make a donation.',
          aboutusTitles: [
            'Share to Help',
            'Who do we help?',
            'Can fraudsters use the site?',
            'How to help?'
          ],
          aboutusParahprahs: [
            'A platform created by caring people to help Ukrainian citizens affected by hostilities in Ukraine.',
            'Citizens of Ukraine affected by hostilities on the territory of Ukraine and those who are now left without a roof over their heads and without means of subsistence. Many people are now hiding in basements and subway stations. Some people don\'t have enough medicine, some people don\'t have enough food. And only all together, by joint efforts, we can help...',
            'Unfortunately, we can\'t rule out the possibility of registering fraudsters, so we recommend that you contact the person you want to donate after reading the application form on the main page.',
            'Currently, the vast majority of Ukrainian citizens need financial assistance. On the home screen you can find stories of people who need help like never before and any transfer will help them.'
          ],
          delete: 'Delete',
          postDeleted: 'Post deleted',
          bankCard: 'Bank card',
          cryptocurrency: 'Cryptocurrency',
          storyPublished: 'Story published',
          invalidCardNumber: 'Invalid card number',
          selectNetwork: 'Select network',
          insertCryptoWalletAddress: 'Insert crypto wallet address',
          fillPage: 'Fill out this page',
          telegramUsernameIsInvalid: 'You can use a-z, 0-9 and underscores. Minimun length is 5 characters',
          enterCryptoOrCardnumber: 'Enter your card number or crypto wallet address',
          cardNumberTooShort: 'Card number must contain 16 characters',
          notSupportedCardNumber: 'The card must be issued by a Ukrainian bank',
          creationLimitExceeded: 'Ви вже створювали запис',
          notFilled: 'Not filled',
          cardNumber: 'Card number',
          network: 'Network',
          address: 'Address',
          cardNumberCopied: 'Card number copied',
          addressCopied: 'Address copied',
          enterYourCardNumber: 'Enter your card number...',
          insertAddress: 'Insert address...',
          getHelpTitle: 'How would you like to get help?'
        },
        ru: {
          generalMessage: 'Проект <b>Share Help</b> не занимается проверкой контента. Мы считаем, что лучшим способом убедиться что людям действительно нужна помощь - это написать им напрямую.',
          whoNeedsHelp: 'Кому нужна помощь',
          aboutUs: 'О нас',
          iNeedHelp: 'Мне нужна помощь',
          myStory: 'Моя история',
          loading: 'Загрузка...',
          projectAppeared: 'Проект только появился.<br /> Историй ещё нет',
          readMore: 'Подробнее',
          yourStory: 'Твоя история...',
          next: 'Далее',
          publish: 'Опубликовать',
          enterTelegramUsername: 'Укажите свой Telegram',
          telegramDescription: 'Проект <b>Share Help</b> не занимается проверкой контента. Мы считаем, что лучшим способом убедиться что Вам действительно нужна помощь - это оставить свои контакты для связи. В таком случае тот кто действительно хочет помочь сможет написать Вам, а после сделать пожертвования',
          aboutusTitles: [
            'Share to Help',
            'Кому помогаем?',
            'Могут ли мошенники использовать сайт?',
            'Как помочь?'
          ],
          aboutusParahprahs: [
            'Платформа созданная неравнодушными людьми, для помощи гражданам Украины, пострадавшим от военных действий на территории Украины.',
            'Гражданам Украины пострадавшим от военных действий на территории Украины и оставшихся сейчас без крыши над головой и без средств существования. Очень много людей сейчас прячеться по подвалам и станциям метро,у кого-то не хватает лекарств,у кого-то не хватает еды. И только все вместе, общими усилиями, мы можем помочь...',
            'К сожалению мы не можем исключить варианты регистрации мошенников и поэтому настоятельно рекомендуем после ознакомления с анкетой на главной странице,связаться с человеком которому хотите сделать перевод.',
            'Сейчас в материальной помощи нуждается подавляющее большинство гражданин Украины. На главном экране вы можете найти анкеты людей, которые нуждаются в помощи как никогда раньше и любой перевод денежных средств поможет им.'
          ],
          delete: 'Удалить',
          postDeleted: 'Запись удалена',
          bankCard: 'Банковская карта',
          cryptocurrency: 'Криптовалюта',
          storyPublished: 'История опубликована',
          invalidCardNumber: 'Неверно указан номер карты',
          selectNetwork: 'Выберите сеть',
          insertCryptoWalletAddress: 'Вставьте адрес криптокошелька',
          fillPage: 'Заполните эту страницу',
          telegramUsernameIsInvalid: 'Вы можете использовать a-z, 0-9 и символы подчеркивания. Минимальная длина 5 символов',
          enterCryptoOrCardnumber: 'Укажите номер карты или адрес криптокошелька',
          cardNumberTooShort: 'Номер карты должен содержать 16 символов',
          notSupportedCardNumber: 'Карта должна быть выпущена Украинским банком',
          creationLimitExceeded: 'You have already created an entry',
          notFilled: 'Не заполнено',
          cardNumber: 'Номер карты',
          network: 'Сеть',
          address: 'Адрес',
          cardNumberCopied: 'Номер карты скопирован',
          addressCopied: 'Адрес скопирован',
          enterYourCardNumber: 'Напишите номер карты...',
          insertAddress: 'Вставьте адрес...',
          getHelpTitle: 'Как бы вы хотели получить помощь?'
        }
      }
    }
  }
})
