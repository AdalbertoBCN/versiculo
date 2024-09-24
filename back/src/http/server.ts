import fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { getAllBooks } from "./routes/get-all-books";
import { getChapters } from "./routes/get-chapters";
import { getRandomChapter } from "./routes/get-random-chapter";
import { getSingleChapter } from "./routes/get-single-chapter";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(getAllBooks);
app.register(getChapters);
app.register(getRandomChapter);
app.register(getSingleChapter);

app.listen({
    port: 3333
}).then(() => {
    console.log("Server HTTP running!");
})