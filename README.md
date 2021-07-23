# PRIMA_Abgabe
 <a href="https://github.com/Slaxxie/PRIMA_Abgabe">zum Repository</a>
 <br>
 <h1>PRIMA Abgabe SS2021</h1>
 
 [Play Enter the Asteroids](https://slaxxie.github.io/PRIMA_Abgabe/WhiteWater/WhiteWater.html)
  <br>[Source Code](https://github.com/Slaxxie/PRIMA_Abgabe)
  <br>[Designdokument](https://github.com/Slaxxie/PRIMA_Abgabe/blob/main/Gamedesign_EnterTheAsteroids.pdf)
  <br>[WeTransfer mit Zip-Archiv](https://we.tl/t-g7RPCZAP5p) leider zu groß für einen push auf Github
  <br>[Controls](https://github.com/Slaxxie/PRIMA_Abgabe/blob/main/WhiteWater/Controls.html)
  
  <br>
  <br>
  <h2>Checkliste für Leistungsnachweis</h2>
  <br>
  © Prof. Dipl.-Ing. Jirka R. Dell’Oro-Friedl, HFU
  <br>
  <table>
 <thead>
  <tr>
   <th style="text-align: right">NR</th>
   <th>Bezeichnung</th>
   <th>Inhalt</th>
  </tr>
 </thead>
 <tbody>
  <tr>
  <td style="text-align: right">&nbsp;</td>
   <td>Titel</td>
   <td>Enter the Asteroids</td>
  </tr>
  <tr>
  <td style="text-align: right">&nbsp;</td>
   <td>Name</td>
   <td>Christian Micka</td>
  </tr>
  <tr>
  <td style="text-align: right">&nbsp;</td>
   <td>Matrikelnummer</td>
   <td>259753</td>
  </tr>
  <tr>
  <td style="text-align: right">1</td>
   <td>Nutzerinteraktion</td>
   <td>"Der Nutzer steuert das Spiel mit den Pfeiltasten oder WASD, 
    sowie SHIFT und SPACE. Mit ESC kann ein Pausemenü aufgerufen werden. 
    Mit der Maus kann das Menü bedient werden"</td>
  </tr>
  <tr>
  <td style="text-align: right">2</td>
   <td>Objektinteraktion</td>
   <td>"Es gibt zwei Arten von Kollision, entweder mit Asteroiden, was zu Schaden führt, 
    oder mit Frachtgut, was die Punkte und in bestimmten Etappen das Level erhöht.
    Die Kollision wird mithilfe der Rectangle Funktion von FUDGE berechnet. 
    Kommt es zu einer Kollision, werden verschiedene Funktionen aufgerufen."</td>
  </tr>
  <tr>
  <td style="text-align: right">3</td>
   <td>Objektanzahl variabel</td>
   <td>"Die Anzahl der Asteroiden ist variabel und diese werden automatisch erzeugt. 
    Außerdem werden Hintergrundelemente erzeugt, sobald ein Bereich nichtmehr im Sichtfeld ist"</td>
  </tr>
  <tr>
  <td style="text-align: right">4</td>
   <td>Szenenhierarchie</td>
   <td>"An erster Stelle steht die GameNode, an der die ViewportNode angehängt wird. 
    An diese werden alle Elemente angeknüpft, die im Spiel angezeigt werden müssen. 
    Teilweise werden objekte in ObjektArrays gepackt, bevor sie an einen Überknoten angehängt werden"</td>
  </tr>
  <tr>
  <td style="text-align: right">5</td>
   <td>Sound</td>
   <td>"Das Menü und das Spiel haben beide einen wiederholenden Soundtrack. 
    Unterstützt wird der Soundtrack durch Soundeffekte für Kollision, 
    aufgesammelte Fracht und Sounds zur Untermalung der Fähigkeiten"</td>
  </tr>
  <tr>
  <td style="text-align: right">6</td>
   <td>GUI</td>
   <td>"Neben dem Hauptmenü, in dem der Spieler Zugriff auf die Optionen und die Highscoreliste hat, 
    gibt es im Spiel Overlays, die die verschiedenen Werte des Avatars wiedergeben. So können Punkte, 
    Level etc. eingesehen werden. Außerdem gibt es auch im Spiel ein Pausemenü"</td>
  </tr>
  <tr>
  <td style="text-align: right">7</td>
   <td>Externe Daten</td>
   <td>"Durch die "GameOptions.json" können verschiedene Werte vor Spielstart definiert werden, 
    um den Schwierigkeitsgrad zu erhöhen oder zu senken. Außerdem werden die Highscores im localStorage 
    gespeichert und auch dort ausgelesen"</td>
  </tr>
  <tr>
  <td style="text-align: right">8</td>
   <td>Verhaltensklassen</td>
   <td>"Spieler, Asteroiden und Fracht haben eigene Methoden in ihren Klassen, die ihr Verhalten steuern. 
    Hierzu zählen beispielsweise Spawn-Raten, Bewegung und Aussehen"</td>
  </tr>
  <tr>
  <td style="text-align: right">9</td>
   <td>Subklassen</td>
   <td>"Die meisten Klassen, die physische Objekte erzeugen, erben von der QuadNode-Klasse, 
    die Kollisionseigenschaften und Meshes definiert"</td>
  </tr>
  <tr>
  <td style="text-align: right">10</td>
   <td>Maße & Positionen</td>
   <td>"Der Spieler stellt mit seinem Mesh die Größeneinheit 1 dar. Die Koordinate (0/0) ist die Mitte des 
   Bildschirms an der unteren Kante, wo auch der Spieler das erste mal spawnt. Somit ist der Bildschirm 
    in zwei Hemisphären mit verschiedenen Vorzeichen aufgeteilt und zuordnung von Positionen ist somit eindeutiger. 
    Außerdem gibt es Modelle für Fracht und Asteroiden, die anhand der Größeneinheit gestaffelt skaliert sind."</td>
  </tr>
  <tr>
  <td style="text-align: right">11</td>
   <td>Eventsystem</td>
   <td>"Die Eingaben des Spielers werden anhand des Eventsystems abgefangen und umgesetzt"</td>
  </tr>
 </tbody>


</table>
