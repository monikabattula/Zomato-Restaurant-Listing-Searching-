const hotelImages = [
  "https://images.unsplash.com/photo-1652043886867-0ec0eeb934da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI1Mjh8MHwxfHNlYXJjaHwxfHxUdXJraXNoJTIwcmVzdGF1cmFudCUyMGJ1aWxkaW5nfGVufDB8fHx8MTcyMzM3NDQ3NXww&ixlib=rb-4.0.3&q=80&w=400",
  "https://images.unsplash.com/photo-1672305330859-71321689e159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI1Mjh8MHwxfHNlYXJjaHwxfHxWaWV0bmFtZXNlJTIwcmVzdGF1cmFudCUyMGJ1aWxkaW5nfGVufDB8fHx8MTcyMzM3NDQ3Nnww&ixlib=rb-4.0.3&q=80&w=400",
 "https://images.unsplash.com/photo-1630686842459-12252a9e4ebc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI1Mjh8MHwxfHNlYXJjaHwxfHxBbWVyaWNhbiUyMHJlc3RhdXJhbnQlMjBidWlsZGluZ3xlbnwwfHx8fDE3MjMzNzQ0Nzd8MA&ixlib=rb-4.0.3&q=80&w=400",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI1Mjh8MHwxfHNlYXJjaHwxfHxTdW5kYSUyMHJlc3RhdXJhbnQlMjBidWlsZGluZ3xlbnwwfHx8fDE3MjMzNzQ0ODR8MA&ixlib=rb-4.0.3&q=80&w=400",
  "https://images.unsplash.com/photo-1697084640710-196b1c0f114b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI1Mjh8MHwxfHNlYXJjaHwxfHxNZXhpY2FuJTIwcmVzdGF1cmFudCUyMGJ1aWxkaW5nfGVufDB8fHx8MTcyMzM3NDQ4NXww&ixlib=rb-4.0.3&q=80&w=400",
  "https://images.unsplash.com/photo-1657571575568-a9dd54629a1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI1Mjh8MHwxfHNlYXJjaHwxfHxCZWxnaWFuJTIwcmVzdGF1cmFudCUyMGJ1aWxkaW5nfGVufDB8fHx8MTcyMzM3NDQ4Nnww&ixlib=rb-4.0.3&q=80&w=400",
 "https://images.unsplash.com/photo-1469307580733-007134b82100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI1Mjh8MHwxfHNlYXJjaHwxfHxBcmdlbnRpbmUlMjByZXN0YXVyYW50JTIwYnVpbGRpbmd8ZW58MHx8fHwxNzIzMzc0NDg3fDA&ixlib=rb-4.0.3&q=80&w=400",
 "https://images.unsplash.com/photo-1541274387095-12117e6099dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI1Mjh8MHwxfHNlYXJjaHwxfHxXZXN0ZXJuJTIwcmVzdGF1cmFudCUyMGJ1aWxkaW5nfGVufDB8fHx8MTcyMzM3NDQ5Mnww&ixlib=rb-4.0.3&q=80&w=400",
  "https://images.unsplash.com/photo-1430163393927-3dab9af7ea38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI1Mjh8MHwxfHNlYXJjaHwxfHxTb3VsJTIwRm9vZCUyMHJlc3RhdXJhbnQlMjBidWlsZGluZ3xlbnwwfHx8fDE3MjMzNzQ0OTd8MA&ixlib=rb-4.0.3&q=80&w=400",
 "https://images.unsplash.com/photo-1541796408240-af1f35c2af6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI1Mjh8MHwxfHNlYXJjaHwxfHxGcmVuY2glMjByZXN0YXVyYW50JTIwYnVpbGRpbmd8ZW58MHx8fHwxNzIzMzc0NDk5fDA&ixlib=rb-4.0.3&q=80&w=400",
  "https://images.unsplash.com/photo-1480796927426-f609979314bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI1Mjh8MHwxfHNlYXJjaHwxfHxBc2lhbiUyMHJlc3RhdXJhbnQlMjBidWlsZGluZ3xlbnwwfHx8fDE3MjMzNzQ1MDB8MA&ixlib=rb-4.0.3&q=80&w=400",
  "https://images.unsplash.com/photo-1715110237800-57c5bb4eb146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI1Mjh8MHwxfHNlYXJjaHwxfHxTdGVhayUyMHJlc3RhdXJhbnQlMjBidWlsZGluZ3xlbnwwfHx8fDE3MjMzNzQ1MDJ8MA&ixlib=rb-4.0.3&q=80&w=400",
 "https://images.unsplash.com/photo-1509870449717-5609536a5393?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI1Mjh8MHwxfHNlYXJjaHwxfHxQb3J0dWd1ZXNlJTIwcmVzdGF1cmFudCUyMGJ1aWxkaW5nfGVufDB8fHx8MTcyMzM3NDUwM3ww&ixlib=rb-4.0.3&q=80&w=400",
 "https://images.unsplash.com/photo-1531973968078-9bb02785f13d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI1Mjh8MHwxfHNlYXJjaHwxfHxDb250ZW1wb3JhcnklMjByZXN0YXVyYW50JTIwYnVpbGRpbmd8ZW58MHx8fHwxNzIzMzc0NTAzfDA&ixlib=rb-4.0.3&q=80&w=400"
]




module.exports = hotelImages; 