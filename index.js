const axios = require('axios');
const protobuf = require("protobufjs");

module.exports = async (version = 'b5dd4e8') => {
    const proto = await axios.get(`https://raw.githubusercontent.com/Furtif/POGOProtos/${version}/base/raw_protos.proto`);
    const oldAdd = protobuf.Namespace.prototype.add;
    protobuf.Namespace.prototype.add = function (object) {
        try {
            return oldAdd.call(this, object);
        } catch (e) {
            console.warn(e);
            this.nested[object.name] = object;
            object.onAdd(this);
            this._nestedArray = null;
            return this;
        }
    }
    const rpc = protobuf.parse(proto.data).root.DumpProtos;

    const assignWithCheck = (obj, field, value) => {
        if (obj[field]) {
            console.warn('Duplicated field detected:', obj[field], value);
        }
        obj[field] = value;
    }

    const obfuscatedField = /^[A-Z]{11}$/;
    for (const [key, value] of Object.entries(rpc)) {
        if (!value) continue;
        let correctKey = null;
        for (const [subkey, subvalue] of Object.entries(value)) {
            if (!obfuscatedField.test(subkey)) continue;
            if (subvalue['CHARACTER_BUG_GRUNT_FEMALE'] === 6) {
                correctKey = 'EnumWrapper';
                assignWithCheck(value, 'InvasionCharacter', subvalue);
            } else if (subvalue['SHADOW'] === 1) {
                correctKey = 'PokemonDisplayProto';
                assignWithCheck(value, 'Alignment', subvalue);
            } else if (subvalue['SUMMER_2018'] === 5) {
                correctKey = 'PokemonDisplayProto';
                assignWithCheck(value, 'Costume', subvalue);
            } else if (subvalue['WEEZING_GALARIAN'] === 944) {
                correctKey = 'PokemonDisplayProto';
                assignWithCheck(value, 'Form', subvalue);
            } else if (subvalue['MALE'] === 1) {
                // could also be BelugaPokemonProto.PokemonGender, which seems unused
                assignWithCheck(value, 'Gender', subvalue);
            } else if (subvalue['WITH_POKEMON_TYPE'] === 1) {
                correctKey = 'QuestConditionProto';
                assignWithCheck(value, 'ConditionType', subvalue);
            } else if (subvalue['POKEMON_ENCOUNTER'] === 7) {
                correctKey = 'QuestRewardProto';
                assignWithCheck(value, 'Type', subvalue);
            }
        }
        if (correctKey !== null) {
            if (correctKey !== key) assignWithCheck(rpc, correctKey, value);
            continue;
        }
        if (!obfuscatedField.test(key)) continue;
        const assignRootEnum = (field) => assignWithCheck(rpc, field, value);
        if (value['ACTIVITY_CATCH_POKEMON'] === 1) {
            assignRootEnum('HoloActivityType');
        } else if (value['CHECKPOINT'] === 1) {
            assignRootEnum('FortType');
        } else if (value['ITEM_CATEGORY_POKEBALL'] === 1) {
            assignRootEnum('HoloItemCategory');
        } else if (value['ITEM_EFFECT_CAP_NO_MOVEMENT'] === 1002) {
            assignRootEnum('HoloItemEffect');
        } else if (value['ITEM_TYPE_POKEBALL'] === 1) {
            assignRootEnum('HoloItemType');
        } else if (value['POKEMON_CLASS_LEGENDARY'] === 1) {
            assignRootEnum('HoloPokemonClass');
        } else if (value['V0001_FAMILY_BULBASAUR'] === 1) {
            assignRootEnum('HoloPokemonFamilyId');
        } else if (value['V0001_POKEMON_BULBASAUR'] === 1) {
            assignRootEnum('HoloPokemonId');
        } else if (value['V0001_MOVE_THUNDER_SHOCK'] === 1) {
            assignRootEnum('HoloPokemonMove');
        } else if (value['POKEMON_ENC_MOVEMENT_JUMP'] === 1) {
            assignRootEnum('HoloPokemonMovementType');
        } else if (value['POKEMON_TYPE_NORMAL'] === 1) {
            assignRootEnum('HoloPokemonType');
        } else if (value['TEMP_EVOLUTION_MEGA'] === 1) {
            assignRootEnum('HoloTemporaryEvolutionId');
        } else if (value['ITEM_POKE_BALL'] === 1) {
            assignRootEnum('Item');
        } else if (value['GET_PLAYER'] === 2) {
            assignRootEnum('Method');
        } else if (value['QUEST_HATCH_EGG'] === 6) {
            assignRootEnum('QuestType');
        } else if (value['RAID_LEVEL_1'] === 1) {
            assignRootEnum('RaidLevel');
        } else if (value['TEAM_BLUE'] === 1) {
            assignRootEnum('Team');
        }
    }

    return rpc;
};
