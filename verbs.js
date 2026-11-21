// Forms and order checked against https://okuzeka.com/tools/irregular-verbs (7 Nov 2026).
// A slash separates accepted spellings for one form.
const verbs = `
be|was / were|been
have|had|had
get|got|got / gotten
make|made|made
go|went|gone
say|said|said
do|did|done
take|took|taken
see|saw|seen
know|knew|known
think|thought|thought
come|came|come
give|gave|given
show|showed|shown / showed
tell|told|told
feel|felt|felt
keep|kept|kept
find|found|found
put|put|put
win|won|won
become|became|become
let|let|let
hold|held|held
run|ran|run
set|set|set
mean|meant|meant
bring|brought|brought
leave|left|left
read|read|read
hear|heard|heard
buy|bought|bought
meet|met|met
lead|led|led
send|sent|sent
pay|paid|paid
hit|hit|hit
break|broke|broken
deal|dealt|dealt
fall|fell|fallen
drive|drove|driven
understand|understood|understood
speak|spoke|spoken
light|lit / lighted|lit / lighted
cost|cost|cost
sell|sold|sold
spend|spent|spent
begin|began|begun
eat|ate|eaten
cut|cut|cut
write|wrote|written
build|built|built
learn|learnt / learned|learnt / learned
fight|fought|fought
stand|stood|stood
sit|sat|sat
lose|lost|lost
bear|bore|borne / born
forget|forgot|forgotten
grow|grew|grown
lie|lay|lain
wear|wore|worn
choose|chose|chosen
catch|caught|caught
sleep|slept|slept
drink|drank|drunk
beat|beat|beaten
throw|threw|thrown
fly|flew|flown
draw|drew|drawn
dream|dreamt / dreamed|dreamt / dreamed
ride|rode|ridden
seek|sought|sought
hurt|hurt|hurt
speed|sped|sped
rise|rose|risen
prove|proved|proven / proved
feed|fed|fed
spring|sprang|sprung
teach|taught|taught
lay|laid|laid
ring|rang|rung
blow|blew|blown
wake|woke|woken
steal|stole|stolen
strike|struck|struck
mistake|mistook|mistaken
wind|wound|wound
spread|spread|spread
burn|burnt / burned|burnt / burned
stick|stuck|stuck
cast|cast|cast
bet|bet|bet
tear|tore|torn
shut|shut|shut
hide|hid|hidden
hang|hung|hung
sing|sang|sung
shoot|shot|shot
split|split|split
smell|smelt / smelled|smelt / smelled
shake|shook|shaken
swear|swore|sworn
upset|upset|upset
quit|quit|quit
spin|spun|spun
broadcast|broadcast|broadcast
spell|spelt / spelled|spelt / spelled
slide|slid|slid
sink|sank|sunk
dig|dug|dug
swing|swung|swung
bite|bit|bitten
rid|rid|rid
shine|shone|shone
lean|leant / leaned|leant / leaned
forgive|forgave|forgiven
sweep|swept|swept
overcome|overcame|overcome
arise|arose|arisen
lend|lent|lent
breed|bred|bred
flee|fled|fled
bind|bound|bound
undertake|undertook|undertaken
undergo|underwent|undergone
bend|bent|bent
burst|burst|burst
withdraw|withdrew|withdrawn
bleed|bled|bled
swim|swam|swum
forecast|forecast|forecast
grind|ground|ground
spoil|spoilt / spoiled|spoilt / spoiled
freeze|froze|frozen
spill|spilt / spilled|spilt / spilled
dive|dived / dove|dived
awake|awoke|awoken
creep|crept|crept
leap|leapt / leaped|leapt / leaped
spit|spat / spit|spat / spit
weave|wove|woven
shrink|shrank|shrunk
swell|swelled|swollen / swelled
oversee|oversaw|overseen
sting|stung|stung
strive|strove|striven
sew|sewed|sewn / sewed
knit|knitted / knit|knitted / knit
forbid|forbade|forbidden
undo|undid|undone
weep|wept|wept
cling|clung|clung
overthrow|overthrew|overthrown
withhold|withheld|withheld
stink|stank|stunk
overtake|overtook|overtaken
withstand|withstood|withstood
misunderstand|misunderstood|misunderstood
tread|trod|trodden
fling|flung|flung
sow|sowed|sown / sowed
kneel|knelt / kneeled|knelt / kneeled
mislead|misled|misled
foresee|foresaw|foreseen
`.trim().split('\n').map((line) => {
  const [v1, v2, v3] = line.split('|');
  return { v1, v2: v2.split(' / '), v3: v3.split(' / ') };
});
