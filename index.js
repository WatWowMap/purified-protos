const axios = require('axios');
const protobuf = require("protobufjs");

module.exports = async (version = '5bf78a1') => {
    const proto = await axios.get(`https://raw.githubusercontent.com/Furtif/POGOProtos/${version}/src/POGOProtos/Rpc/Rpc.proto`);
    const rpc = protobuf.parse(proto.data).root.POGOProtos.Rpc;

    const assignWithCheck = (obj, field, value) => {
        if (obj[field]) {
            console.warn('Duplicated field detected:', obj[field], value);
        }
        obj[field] = value;
    }

    const obfuscatedField = /^[A-Z]{11}$/;
    for (const [key, value] of Object.entries(rpc)) {
        if (!obfuscatedField.test(key)) continue;
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
            assignWithCheck(rpc, correctKey, value);
            continue;
        }
        const prefix = key.replace(/./g, '$&_');
        const assignRootEnum = (field) => {
            for (const [subkey, subvalue] of Object.entries(value)) {
                if (subkey.startsWith(prefix)) value[subkey.substr(prefix.length)] = subvalue;
            }
            assignWithCheck(rpc, field, value);
        };
        if (value[prefix + 'ACTIVITY_CATCH_POKEMON'] === 1) {
            assignRootEnum('HoloActivityType');
        } else if (value[prefix + 'ITEM_CATEGORY_POKEBALL'] === 1) {
            assignRootEnum('HoloItemCategory');
        } else if (value[prefix + 'ITEM_EFFECT_CAP_NO_MOVEMENT'] === 1002) {
            assignRootEnum('HoloItemEffect');
        } else if (value[prefix + 'ITEM_TYPE_POKEBALL'] === 1) {
            assignRootEnum('HoloItemType');
        } else if (value[prefix + 'POKEMON_CLASS_LEGENDARY'] === 1) {
            assignRootEnum('HoloPokemonClass');
        } else if (value[prefix + 'V0001_FAMILY_BULBASAUR'] === 1) {
            assignRootEnum('HoloPokemonFamilyId');
        } else if (value[prefix + 'V0001_POKEMON_BULBASAUR'] === 1) {
            assignRootEnum('HoloPokemonId');
        } else if (value[prefix + 'V0001_MOVE_THUNDER_SHOCK'] === 1) {
            assignRootEnum('HoloPokemonMove');
        } else if (value[prefix + 'POKEMON_ENC_MOVEMENT_JUMP'] === 1) {
            assignRootEnum('HoloPokemonMovementType');
        } else if (value[prefix + 'POKEMON_TYPE_NORMAL'] === 1) {
            assignRootEnum('HoloPokemonType');
        } else if (value[prefix + 'ITEM_POKE_BALL'] === 1) {
            assignRootEnum('Item');
        } else if (value[prefix + 'QUEST_HATCH_EGG'] === 6) {
            assignRootEnum('QuestType');
        } else if (value[prefix + 'RAID_LEVEL_1'] === 1) {
            assignRootEnum('RaidLevel');
        } else if (value[prefix + 'TEAM_BLUE'] === 1) {
            assignRootEnum('Team');
        } else if (value[prefix + 'TEMP_EVOLUTION_MEGA'] === 1) {
            assignRootEnum('TempEvolution');    // obfuscated guessed name
        }
    }

    return rpc;
};
