export enum ContentType {
    Quote = "quote",
    Idea = "idea",
    Recipe = "recipe",
    Anecdote = "anecdote",
    Word = "word",
    Song = "song",
    Drink = "drink",
    Game = "game",
    Quiz = "quiz",
    Story = "story",
}

export enum IdeaType {
    Book = "book",
    Recipe = "recipe",
    TvShow = "tvshow",
    Idea = "idea",
    List = "list",
    Video = "video",
    Game = "game",
    Creator = "creator",
}

export enum GameType {
    Pendu = "pendu",
    Jeu = "jeu",
    QuizCitation = "quiz-citation",
    QuizNoel = "quiz-noel",
    QuizEmojis = "quiz-emojis",
    QuizHalloween = "quiz-halloween",
}

export enum Season {
    Christmas = "christmas",
    Halloween = "halloween",
}

export enum ScoreType {
    ContentOpening = "ContentOpening",
    GameAnswer = "GameAnswer",
    DayOpening = "DayOpening",
    OctoberOpening = "OctoberOpening", // Just a record that the day was opened
}

export enum CountdownVariant {
    Nights = "nights", // "x nuits avant Noël" - default
    Columns = "columns", // days/hours/minutes/seconds side by side, big number above small label
}

export enum ChristmasTargetDay {
    Eve = 24, // 24 décembre - réveillon
    Day = 25, // 25 décembre - default
}
