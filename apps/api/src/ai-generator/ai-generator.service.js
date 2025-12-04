"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiGeneratorService = void 0;
var common_1 = require("@nestjs/common");
var generative_ai_1 = require("@google/generative-ai");
var AiGeneratorService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AiGeneratorService = _classThis = /** @class */ (function () {
        function AiGeneratorService_1(configService) {
            this.configService = configService;
            this.logger = new common_1.Logger(AiGeneratorService.name);
            // System Prompt dari app.py
            this.SYSTEM_SEED = "\n    You are a senior conversion copywriter, UX strategist, and landing page architect.\n    You write persuasive, human-sounding Bahasa Indonesia that feels premium, modern, and high-performing.\n    You deeply understand buyer psychology for UMKM, D2C brands, SaaS, and IoT products.\n    Always output complete, valid, production-ready results\u2014no placeholders, no markdown, no commentary.\n  ";
            var apiKey = this.configService.get('GEMINI_API_KEY');
            this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
            if (!apiKey) {
                this.logger.error('GEMINI_API_KEY not found in .env');
                throw new Error('GEMINI_API_KEY is missing');
            }
            // Tambahkan tanda seru (!) di akhir apiKey
            // Ini memberitahu TypeScript: "Saya yakin variabel ini TIDAK null/undefined"
            this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
            // Model untuk Copywriting (JSON Strict)
            this.modelCopy = this.genAI.getGenerativeModel({
                model: 'gemini-1.5-flash', // Gunakan Flash agar cepat & hemat, atau Pro untuk kualitas
                systemInstruction: this.SYSTEM_SEED,
                generationConfig: {
                    temperature: 0.45,
                    responseMimeType: 'application/json',
                },
            });
            // Model untuk Coding HTML
            this.modelHtml = this.genAI.getGenerativeModel({
                model: 'gemini-1.5-flash',
                systemInstruction: this.SYSTEM_SEED,
                generationConfig: {
                    temperature: 0.25,
                },
            });
        }
        AiGeneratorService_1.prototype.generateCopy = function (brief, voice) {
            return __awaiter(this, void 0, void 0, function () {
                var prompt_1, result, response, copyData, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            this.logger.log("Generating copy for: ".concat(brief.product_name));
                            prompt_1 = this.buildCopyPrompt(brief, voice);
                            return [4 /*yield*/, this.modelCopy.generateContent(prompt_1)];
                        case 1:
                            result = _a.sent();
                            response = result.response;
                            copyData = JSON.parse(response.text());
                            return [2 /*return*/, this.refineCopy(copyData)];
                        case 2:
                            error_1 = _a.sent();
                            this.logger.error('Gemini Copy Error', error_1);
                            throw new common_1.InternalServerErrorException('Gagal membuat copy: ' + error_1.message);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AiGeneratorService_1.prototype.generateHtml = function (brief, design, layout, copy) {
            return __awaiter(this, void 0, void 0, function () {
                var prompt_2, result, html, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            this.logger.log("Generating HTML for: ".concat(brief.product_name));
                            prompt_2 = this.buildHtmlPrompt(brief, design, layout, copy);
                            return [4 /*yield*/, this.modelHtml.generateContent(prompt_2)];
                        case 1:
                            result = _a.sent();
                            html = result.response.text();
                            // Bersihkan markdown formatting jika ada
                            html = html.replace(/^```html|```$/gm, '').trim();
                            return [2 /*return*/, html];
                        case 2:
                            error_2 = _a.sent();
                            this.logger.error('Gemini HTML Error', error_2);
                            throw new common_1.InternalServerErrorException('Gagal membuat HTML: ' + error_2.message);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        // --- PRIVATE HELPERS ---
        AiGeneratorService_1.prototype.buildCopyPrompt = function (brief, voice) {
            var toneString = voice.tone.join(', ');
            // Schema manual untuk memandu AI (versi ringkas)
            var schemaStructure = {
                hero: { headline: "string", subheadline: "string", bullets: ["string"], primary_cta: "string", secondary_cta: "string", social_proof: "string" },
                benefits: [{ title: "string", desc: "string" }],
                features: [{ title: "string", desc: "string" }],
                testimonials: [{ name: "string", role: "string", quote: "string" }],
                pricing: { plans: [{ name: "string", price: "string", items: ["string"] }], note: "string" },
                faq: [{ q: "string", a: "string" }],
                cta: { headline: "string", kicker: "string", button: "string" }
            };
            return "\n      CONTEXT:\n      Product: ".concat(brief.product_name, "\n      One Liner: ").concat(brief.one_liner, "\n      Audience: ").concat(brief.audience, "\n      Problem: ").concat(brief.problem, "\n      Solution: ").concat(brief.solution, "\n      Offer: ").concat(brief.offer || '-', "\n      \n      VOICE:\n      Archetype: ").concat(voice.archetype, "\n      Tone: ").concat(toneString, "\n      Language Style: ").concat(voice.conversational ? 'Conversational, engaging' : 'Formal, professional', "\n      \n      TASK:\n      Create a landing page copy in Bahasa Indonesia.\n      Ensure the output matches this JSON schema structure exactly:\n      ").concat(JSON.stringify(schemaStructure), "\n    ");
        };
        AiGeneratorService_1.prototype.buildHtmlPrompt = function (brief, design, layout, copy) {
            var dataPayload = JSON.stringify({ brief: brief, design: design, layout: layout, copy: copy });
            return "\n      Build a single-file HTML landing page (Premium Quality).\n      \n      TECH STACK:\n      - Use Tailwind CSS via CDN (script src).\n      - Font: Google Fonts (".concat(design.font_heading, " & ").concat(design.font_body, ").\n      \n      DESIGN SYSTEM:\n      - Primary Color: ").concat(design.primary, "\n      - Accent Color: ").concat(design.accent, "\n      - Background: ").concat(design.bg, "\n      \n      LAYOUT RULES:\n      - Order: ").concat(layout.order.join(', '), "\n      - Container: ").concat(layout.container, "\n      - Sticky Navbar: ").concat(layout.sticky_navbar, "\n      - Sticky CTA: ").concat(layout.sticky_cta, "\n      \n      INSTRUCTION:\n      - Output ONLY raw HTML code (starting with <!DOCTYPE html>).\n      - Do not wrap in markdown blocks.\n      - Ensure mobile responsiveness.\n      \n      CONTENT DATA:\n      ").concat(dataPayload, "\n    ");
        };
        AiGeneratorService_1.prototype.refineCopy = function (copy) {
            // Logic sederhana untuk memastikan data minimal ada
            if (!copy.hero.bullets || copy.hero.bullets.length < 3) {
                copy.hero.bullets = ["Keunggulan 1", "Keunggulan 2", "Keunggulan 3"];
            }
            return copy;
        };
        return AiGeneratorService_1;
    }());
    __setFunctionName(_classThis, "AiGeneratorService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AiGeneratorService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AiGeneratorService = _classThis;
}();
exports.AiGeneratorService = AiGeneratorService;
