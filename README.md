Projekt został wykonany z użyciem szablonu **create-react-app**.

##### Wykorzystane rozwiazania:
- **flow** do kontroli typów
- **eslint** do statycznej analizy kodu
- **prettier** do spójnego formatowania kodu
- **jest** i **enzyme** do testów jednostkowych
- **cypress** do testów e2e
- **webpack** i **babel** do budowania aplikacji
- **axios** do zapytań REST
- **immer** do modyfikacji stanu redux'a
- **react** i **redux** jako główny framework aplikacji
- **material-ui** jako komponenty ui zgodne z metodologia material-design
- **reapop** do wyświetlania notyfikacji
- **styled-components** do stylowania komponentów w podejściu css-in-js

##### Dostępne widoki:
- lista kategorii
- lista postów w wybranej kategorii
- szczegóły posta&ast;
- tworzenie posta
- edycja posta

&ast;akcja usuwania posta dostępna z poziomu szczegółów posta

##### Możliwe usprawnienia:
- Zwiększyć pokrycie kodu testami jednostkowymi
- Dodać testy e2e dla pozostałych scenariuszy (gotowy test tylko dla scenariusza tworzenia posta)
- Przemyśleć możliwość uwspólnienia widoków dla tworzenia/edycji/przegladu posta. 
(Część kodu dla tych widoków jest zduplikowana, uwspólnienie widoków poprawi
reużycie kodu, ale może prowadzić do większej ilości błędów spowodowanych przez
większe skomplikowanie widoku, dlatego należy zrobić to rozważnie)
- Poprawić komunikację błędów w formularzu edycji i tworzenia posta
(Powinny pojawić się szczegółowe informacje pod każdą kontrolką co jest z danym polem nie tak)
- Zweryfikować działanie aplikacji na ekranach o różnej rozdzielczości i poprawić ewentualne problemy związane z responsywnością
- Przemyśleć czy poszczególne widoki, które się dosyć rozrosły można podzielić na mniejsze komponenty
- Dodać dokumentacje kodu

##### Instalacja i uruchominie:
1. Pobierz repozytorium
1. Uruchom `npm install`, aby zainstalować zależności
1. Uruchom backend aplikacji na porcie 8000. (Konfiguracja adresu, pod którym dostępny jest backend w pliku __src/service/utils.js__)
1. Uruchom frontend aplikacji poleceniem `npm start`. (Domyślnie odpala się on na porcie 3001)
1. Uruchom dowolną przeglądarkę wpisując adres **localhost:3001**

##### Testy i statyczna analiza kodu
- Testy jednostkowe uruchom poleceniem `npm run test`
- Testy e2e uruchom poleceniem `npm run cypress-run`
- Analize typów flow uruchom poleceniem `npm run flow-check` (Aby flow działał poprawnie należy po każdej instalacji zależności uruchomić polecenie `npm run update-flow-libs-definitions`)
- Analize eslint uruchom poleceniem `npm run eslint-check`