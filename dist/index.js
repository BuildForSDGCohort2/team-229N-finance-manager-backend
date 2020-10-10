"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const db_1 = require("./config/db");
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("./routes/auth"));
const company_1 = __importDefault(require("./routes/company"));
const code_1 = __importDefault(require("./routes/code"));
const transaction_1 = __importDefault(require("./routes/transaction"));
const constants_1 = require("./constants");
const app = express_1.default();
const port = process.env.PORT || 8000;
if (!constants_1.__prod__) {
    const dotenv = require('dotenv');
    dotenv.config({ path: './config.env' });
}
if (!constants_1.__prod__) {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}
app.engine('.hbs', express_handlebars_1.default({
    defaultLayout: 'main',
    extname: '.hbs',
}));
app.set('view engine', '.hbs');
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.get('/', (req, res) => {
    res.render('index.html');
});
app.use('/auth', auth_1.default);
app.use('/company', company_1.default);
app.use('/code', code_1.default);
app.use('/transaction', transaction_1.default);
db_1.connectDB();
app.listen(port, () => console.log(`app started on port ${port} in ${process.env.NODE_ENV} mode`));
