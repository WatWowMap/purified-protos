const assert = require('assert');
const protos = require('..');

const tester = (spawn) => function () {
    let rpc;
    before(async () => {
        rpc = await spawn();
    });

    it('EnumWrapper', () => assert.notStrictEqual(rpc.EnumWrapper, undefined));
    it('EnumWrapper.InvasionCharacter', () => assert.notStrictEqual(rpc.EnumWrapper.InvasionCharacter.CHARACTER_DRAGON_BALLOON_GRUNT_FEMALE, undefined));
    it('HoloActivityType', () => assert.notStrictEqual(rpc.HoloActivityType.ACTIVITY_CATCH_EXCELLENT_THROW, undefined));
    it('HoloItemCategory', () => assert.notStrictEqual(rpc.HoloItemCategory.ITEM_CATEGORY_RAID_TICKET, undefined));
    it('HoloItemEffect', () => assert.notStrictEqual(rpc.HoloItemEffect.ITEM_EFFECT_FULL_MOTIVATION, undefined));
    it('HoloItemType', () => assert.notStrictEqual(rpc.HoloItemType.ITEM_TYPE_RAID_TICKET, undefined));
    it('HoloPokemonClass', () => assert.notStrictEqual(rpc.HoloPokemonClass.POKEMON_CLASS_MYTHIC, undefined));
    it('HoloPokemonFamilyId', () => assert.notStrictEqual(rpc.HoloPokemonFamilyId.V0151_FAMILY_MEW, undefined));
    it('HoloPokemonId', () => assert.notStrictEqual(rpc.HoloPokemonId.V0150_POKEMON_MEWTWO, undefined));
    it('HoloPokemonMove', () => assert.notStrictEqual(rpc.HoloPokemonMove.V0109_MOVE_PSYSTRIKE, undefined));
    it('HoloPokemonMovementType', () => assert.notStrictEqual(rpc.HoloPokemonMovementType.POKEMON_ENC_MOVEMENT_ELECTRIC, undefined));
    it('HoloPokemonType', () => assert.notStrictEqual(rpc.HoloPokemonType.POKEMON_TYPE_FAIRY, undefined));
    it('Item', () => assert.notStrictEqual(rpc.Item.ITEM_REVIVE, undefined));
    it('PokemonDisplayProto', () => assert.notStrictEqual(rpc.PokemonDisplayProto, undefined));
    it('PokemonDisplayProto.Alignment', () => assert.notStrictEqual(rpc.PokemonDisplayProto.Alignment.PURIFIED, undefined));
    it('PokemonDisplayProto.Costume', () => assert.notStrictEqual(rpc.PokemonDisplayProto.Costume.NOT_FOR_RELEASE_ALPHA, undefined));
    it('PokemonDisplayProto.Form', () => assert.notStrictEqual(rpc.PokemonDisplayProto.Form.ZIGZAGOON_GALARIAN, undefined));
    it('PokemonDisplayProto.Gender', () => assert.notStrictEqual(rpc.PokemonDisplayProto.Gender.GENDERLESS, undefined));
    it('QuestConditionProto', () => assert.notStrictEqual(rpc.QuestConditionProto, undefined));
    it('QuestConditionProto.ConditionType', () => assert.notStrictEqual(rpc.QuestConditionProto.ConditionType.WITH_WIN_RAID_STATUS, undefined));
    it('QuestRewardProto', () => assert.notStrictEqual(rpc.QuestRewardProto, undefined));
    it('QuestRewardProto.Type', () => assert.notStrictEqual(rpc.QuestRewardProto.Type.MEGA_RESOURCE, undefined));
    it('QuestType', () => assert.notStrictEqual(rpc.QuestType.QUEST_BUDDY_FEED, undefined));
    it('Team', () => assert.notStrictEqual(rpc.Team.TEAM_RED, undefined));
    it('TempEvolution', () => assert.notStrictEqual(rpc.TempEvolution.TEMP_EVOLUTION_MEGA_X, undefined));
};

describe('protos', tester(() => protos()));
describe('master', tester(() => protos('master')));
