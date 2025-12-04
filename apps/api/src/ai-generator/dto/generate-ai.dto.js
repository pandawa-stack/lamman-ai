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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateHtmlDto = exports.GenerateCopyDto = void 0;
var class_validator_1 = require("class-validator");
var GenerateCopyDto = function () {
    var _a;
    var _brief_decorators;
    var _brief_initializers = [];
    var _brief_extraInitializers = [];
    var _voice_decorators;
    var _voice_initializers = [];
    var _voice_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GenerateCopyDto() {
                this.brief = __runInitializers(this, _brief_initializers, void 0);
                this.voice = (__runInitializers(this, _brief_extraInitializers), __runInitializers(this, _voice_initializers, void 0));
                __runInitializers(this, _voice_extraInitializers);
            }
            return GenerateCopyDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _brief_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsObject)()];
            _voice_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsObject)()];
            __esDecorate(null, null, _brief_decorators, { kind: "field", name: "brief", static: false, private: false, access: { has: function (obj) { return "brief" in obj; }, get: function (obj) { return obj.brief; }, set: function (obj, value) { obj.brief = value; } }, metadata: _metadata }, _brief_initializers, _brief_extraInitializers);
            __esDecorate(null, null, _voice_decorators, { kind: "field", name: "voice", static: false, private: false, access: { has: function (obj) { return "voice" in obj; }, get: function (obj) { return obj.voice; }, set: function (obj, value) { obj.voice = value; } }, metadata: _metadata }, _voice_initializers, _voice_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GenerateCopyDto = GenerateCopyDto;
var GenerateHtmlDto = function () {
    var _a;
    var _brief_decorators;
    var _brief_initializers = [];
    var _brief_extraInitializers = [];
    var _design_decorators;
    var _design_initializers = [];
    var _design_extraInitializers = [];
    var _layout_decorators;
    var _layout_initializers = [];
    var _layout_extraInitializers = [];
    var _copy_decorators;
    var _copy_initializers = [];
    var _copy_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GenerateHtmlDto() {
                this.brief = __runInitializers(this, _brief_initializers, void 0);
                this.design = (__runInitializers(this, _brief_extraInitializers), __runInitializers(this, _design_initializers, void 0));
                this.layout = (__runInitializers(this, _design_extraInitializers), __runInitializers(this, _layout_initializers, void 0));
                this.copy = (__runInitializers(this, _layout_extraInitializers), __runInitializers(this, _copy_initializers, void 0));
                __runInitializers(this, _copy_extraInitializers);
            }
            return GenerateHtmlDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _brief_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsObject)()];
            _design_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsObject)()];
            _layout_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsObject)()];
            _copy_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsObject)()];
            __esDecorate(null, null, _brief_decorators, { kind: "field", name: "brief", static: false, private: false, access: { has: function (obj) { return "brief" in obj; }, get: function (obj) { return obj.brief; }, set: function (obj, value) { obj.brief = value; } }, metadata: _metadata }, _brief_initializers, _brief_extraInitializers);
            __esDecorate(null, null, _design_decorators, { kind: "field", name: "design", static: false, private: false, access: { has: function (obj) { return "design" in obj; }, get: function (obj) { return obj.design; }, set: function (obj, value) { obj.design = value; } }, metadata: _metadata }, _design_initializers, _design_extraInitializers);
            __esDecorate(null, null, _layout_decorators, { kind: "field", name: "layout", static: false, private: false, access: { has: function (obj) { return "layout" in obj; }, get: function (obj) { return obj.layout; }, set: function (obj, value) { obj.layout = value; } }, metadata: _metadata }, _layout_initializers, _layout_extraInitializers);
            __esDecorate(null, null, _copy_decorators, { kind: "field", name: "copy", static: false, private: false, access: { has: function (obj) { return "copy" in obj; }, get: function (obj) { return obj.copy; }, set: function (obj, value) { obj.copy = value; } }, metadata: _metadata }, _copy_initializers, _copy_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GenerateHtmlDto = GenerateHtmlDto;
