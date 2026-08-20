import app from "./index";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Express server has started on port ${PORT}`);
});
