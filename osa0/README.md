0.4

```
selain->palvelin: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note
note over palvelin:
palvelimen koodi lisää uuden muistiinpanon
notes-arrayyn.
end note
palvelin->selain: redirect-pyyntö /notes-sivulle
selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/notes
palvelin-->selain: HTML-koodi
selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
palvelin-->selain: main.css
selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.js
palvelin-->selain: main.js

note over selain:
selain alkaa suorittaa js-koodia
joka pyytää JSON-datan palvelimelta
end note

selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
palvelin-->selain: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over selain:
selain suorittaa tapahtumankäsittelijän
joka renderöi muistiinpanot näytölle
end note
```

0.5

```
selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa
palvelin-->selain: HTML-koodi
selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
palvelin-->selain: main.css
selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa.js
palvelin-->selain: spa.js

note over selain:
selain alkaa suorittaa js-koodia
joka pyytää JSON-datan palvelimelta
end note

selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
palvelin-->selain: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over selain:
selain suorittaa tapahtumankäsittelijän
joka renderöi muistiinpanot näytölle
end note
```

0.6

```
note over selain:
js-koodi lisää muistiinpanon listaan,
päivittää elementin joka sisältää notet
ja lähettää JSON-dataa palvelimelle
end note
selain->palvelin: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa
note over palvelin:
palvelimen koodi lisää uuden muistiinpanon
notes-arrayyn.
end note
palvelin->selain: 201 Created
```
