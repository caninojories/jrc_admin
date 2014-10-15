"use strict";

var mongo 		= require('../../../config/mongodb'),
    mongodb		= require('mongodb'),
    util			= require('util'),
    _     		= require('underscore')._,
    fs 				= require('fs');

exports.user = function (req, res) {
  var SN = req.body.studentNumber;
  var url = require('url');
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  mongo('paragala', function (db) {
    console.log("PARAGALA STUDENT")
    db.open(function (err, db) {
      if(err) throw err
      db.collection('student').findOne( {_id: query.studentNumber}, function (err, doc) {
        if(err) throw err
        console.log('STUDENT LOGIN ' + doc)
        if(doc == null)
          res.json( {response: 'fail'} )
        else{
          if(doc.isAlreadyVoted == "true") {
            req.session.isLogin = null;
            req.session.SN = null;
            res.json( {response: 'success', isAlreadyVoted: doc.isAlreadyVoted} )
          } else {
            req.session.isLogin = true;
            req.session.SN = doc._id
            res.json( {response: 'success', isAlreadyVoted: doc.isAlreadyVoted} )
          }

        }

      })
    })
  })
}

exports.questionBuilder = function (req, res) {
  mongo('paragala', function (db) {
    db.open(function (err, db) {
      if(err) throw err
      db.collection('questionnaire').findOne({},function (err, doc) {
        if(err) throw err
        res.json({document: doc})
      })
    })
  })
}


exports.results = function(req, res) {
  var out = []

  var actorCountForJericho 	= 0,
      actorCountForAlden 		= 0,
      actorCountForCoco 		= 0,
      actorCountForAljur 		= 0,
      actorCountForEnrique 	= 0,
      actorCountForPaulo 		= 0,
      actorCountForRichard 	= 0,
      actorCountForAlwyn 		= 0;

  var actorListJericho		= [],
      actorListAlden			= [],
      actorListCoco				= [],
      actorListAljur			= [],
      actorListEnrique		= [],
      actorListPaulo			= [],
      actorListRichard		= [],
      actorListAlwyn			= [];

  var actressCountForAngel 	= 0,
      actressCountForMaja		= 0,
      actressCountForMarian	= 0,
      actressCountForJen		= 0,
      actressCountForAnn		= 0,
      actressCountForJodi		= 0,
      actressCountForBea		= 0,
      actressCountForKim		= 0;

  var actressListAngel 	= [],
      actressListMaja 	= [],
      actressListMarian = [],
      actressListJen 		= [],
      actressListAnn 		= [],
      actressListJodi 	= [],
      actressListBea 		= [],
      actressListKim 		= [];

  var maleChildPerformerCountForBimbi 		= 0,
      maleChildPerformerCountForRemo 			= 0,
      maleChildPerformerCountForJM 				= 0,
      maleChildPerformerCountForClarence 	= 0,
      maleChildPerformerCountForBugoy 		= 0;

  var maleChildPerformerListBimbi 		= [],
      maleChildPerformerListRemo 			= [],
      maleChildPerformerListJM 				= [],
      maleChildPerformerListClarence 	= [],
      maleChildPerformerListBugoy 		= [];

  var femaleChildPerformerCountForRyzza		= 0,
      femaleChildPerformerCountForXyriel	= 0,
      femaleChildPerformerCountForJillian	= 0,
      femaleChildPerformerCountForMutya		= 0,
      femaleChildPerformerCountForRhed		= 0;

  var femaleChildPerformerListRyzza		= [],
      femaleChildPerformerListXyriel	= [],
      femaleChildPerformerListJillian	= [],
      femaleChildPerformerListMutya		= [],
      femaleChildPerformerListRhed		= [];

  var teleseryeCountForLegalWife					= 0,
      teleseryeCountForRhodora						= 0,
      teleseryeCountForCarmela						= 0,
      teleseryeCountForIkawLamang					= 0,
      teleseryeCountForDyesebel						= 0,
      teleseryeCountForBekiBoxer					= 0,
      teleseryeCountForBeCareful					= 0,
      teleseryeCountForBukasPaAngKahapon	= 0;

  var teleseryeListLegalWife					= [],
      teleseryeListRhodora						= [],
      teleseryeListCarmela						= [],
      teleseryeListIkawLamang					= [],
      teleseryeListDyesebel						= [],
      teleseryeListBekiBoxer					= [],
      teleseryeListBeCareful					= [],
      teleseryeListBukasPaAngKahapon	= [];

  var sitComCountForHomeSweetie	= 0,
      sitComCountForVampire			= 0,
      sitComCountForPepito			= 0,
      sitComCountForConfessions	= 0,
      sitComCountForOneOfBoys		= 0;

  var sitComListHomeSweetie	= [],
      sitComListVampire			= [],
      sitComListPepito			= [],
      sitComListConfessions	= [],
      sitComListOneOfBoys		= [];

  var gagShowCountForBubleGang	= 0,
      gagShowCountForBanana			= 0,
      gagShowCountForBulilit		= 0,
      gagShowCountForWowMali		= 0;

  var gagShowListBubleGang	= [],
      gagShowListBanana			= [],
      gagShowListBulilit		= [],
      gagShowListWowMali		= [];

  var musicalVarietyCountForASAP						= 0,
      musicalVarietyCountForSundayAllStars	= 0,
      musicalVarietyCountForWalangTulugan		= 0;

  var musicalVarietyListASAP						= [],
      musicalVarietyListSundayAllStars	= [],
      musicalVarietyListWalangTulugan		= [];

  var talkShowCountForKrisTV			= 0,
      talkShowCountForGGV					= 0,
      talkShowCountForMars				= 0,
      talkShowCountForRyzzaMae		= 0,
      talkShowCountForFacePeople	= 0;

  var talkShowListKrisTV			= [],
      talkShowListGGV					= [],
      talkShowListMars				= [],
      talkShowListRyzzaMae		= [],
      talkShowListFacePeople	= [];

  var talkShowHostCountForKris				= 0,
      talkShowHostCountForViceGanda		= 0,
      talkShowHostCountForCamille			= 0,
      talkShowHostCountForRyzzaMae		= 0,
      talkShowHostCountForGelli				= 0,
      talkShowHostCountForToni				= 0;

  var talkShowHostListKris				= [],
      talkShowHostListViceGanda		= [],
      talkShowHostListCamille			= [],
      talkShowHostListRyzzaMae		= [],
      talkShowHostListGelli				= [],
      talkShowHostListToni				= [];

  var entertainmentNewsProgramCountForTheBuzz					= 0,
      entertainmentNewsProgramCountForStarTalk				= 0,
      entertainmentNewsProgramCountForShowbizPolice		= 0,
      entertainmentNewsProgramCountForAquinoAndAbunda	= 0;

  var entertainmentNewsProgramListTheBuzz					= [],
      entertainmentNewsProgramListStarTalk				= [],
      entertainmentNewsProgramListShowbizPolice		= [],
      entertainmentNewsProgramListAquinoAndAbunda	= [];

  var entertainmentNewsProgramHostCountForKris		= 0,
      entertainmentNewsProgramHostCountForBoy			= 0,
      entertainmentNewsProgramHostCountForJoey		= 0,
      entertainmentNewsProgramHostCountForRaymond	= 0;

  var entertainmentNewsProgramHostListKris		= [],
      entertainmentNewsProgramHostListBoy			= [],
      entertainmentNewsProgramHostListJoey		= [],
      entertainmentNewsProgramHostListRaymond	= [];

  var varietyShowCountForShowTime		= 0,
      varietyShowCountForEatBulaga	= 0;

  var varietyShowListShowTime		= [],
      varietyShowListEatBulaga	= [];

  var variteyShowHostCountForViceGanda	= 0,
      variteyShowHostCountForAnn				= 0,
      variteyShowHostCountForVic				= 0,
      variteyShowHostCountForJoey				= 0;

  var variteyShowHostListViceGanda	= [],
      variteyShowHostListAnn				= [],
      variteyShowHostListVic				= [],
      variteyShowHostListJoey				= [];

  var gameShowCountForBetOnYourBaby		= 0,
      gameShowCountForSingingBee			= 0,
      gameShowCountForPicture					= 0,
      gameShowCountForCelebrityBluff	= 0,
      gameShowCountForMillionaire			= 0,
      gameShowCountForKillerKaraoke		= 0;

  var gameShowListBetOnYourBaby		= [],
      gameShowListSingingBee			= [],
      gameShowListPicture					= [],
      gameShowListCelebrityBluff	= [],
      gameShowListMillionaire			= [],
      gameShowListKillerKaraoke		= [];

  var gameShowHostCountForJudyAnn			= 0,
      gameShowHostCountForRyan				= 0,
      gameShowHostCountForEugene			= 0,
      gameShowHostCountForVic					= 0,
      gameShowHostCountForMichael			= 0,
      gameShowHostCountForAmy					= 0;

  var gameShowHostListJudyAnn			= [],
      gameShowHostListRyan				= [],
      gameShowHostListEugene			= [],
      gameShowHostListVic					= [],
      gameShowHostListMichael			= [],
      gameShowHostListAmy					= [];

  var dramaAnthologyCountForMaalala						= 0,
      dramaAnthologyCountForMagpakailanman		= 0,
      dramaAnthologyCountForMinamahal					= 0;

  var dramaAnthologyListMaalala						= [],
      dramaAnthologyListMagpakailanman		= [],
      dramaAnthologyListMinamahal					= [];

  var morningShowCountForUmagangKayGanda	= 0,
      morningShowCountForUnangHirit				= 0,
      morningShowCountForGoodMorningClub	= 0;

  var morningShowListUmagangKayGanda	= [],
      morningShowListUnangHirit				= [],
      morningShowListGoodMorningClub	= [];

  var morningShowHostCountForAnthony			= 0,
      morningShowHostCountForBernadette		= 0,
      morningShowHostCountForArnold				= 0,
      morningShowHostCountForRhea					= 0,
      morningShowHostCountForCheryl				= 0;

  var morningShowHostListAnthony			= [],
      morningShowHostListBernadette		= [],
      morningShowHostListArnold				= [],
      morningShowHostListRhea					= [],
      morningShowHostListCheryl				= [];

  var newsProgramCountForTVPatrol	= 0,
      newsProgramCountFor24Oras		= 0,
      newsProgramCountForBandila	= 0,
      newsProgramCountForSaksi		= 0,
      newsProgramCountForAksyon		= 0,
      newsProgramCountForSONA			= 0;

  var newsProgramListTVPatrol	= [],
      newsProgramList24Oras		= [],
      newsProgramListBandila	= [],
      newsProgramListSaksi		= [],
      newsProgramListAksyon		= [],
      newsProgramListSONA			= [];

  var newsProgramMaleAnchorCountForNoli		= 0,
      newsProgramMaleAnchorCountForTed		= 0,
      newsProgramMaleAnchorCountForMike		= 0,
      newsProgramMaleAnchorCountForErwin	= 0,
      newsProgramMaleAnchorCountForArnold	= 0,
      newsProgramMaleAnchorCountForJulius	= 0;

  var newsProgramMaleAnchorListNoli		= [],
      newsProgramMaleAnchorListTed		= [],
      newsProgramMaleAnchorListMike		= [],
      newsProgramMaleAnchorListErwin	= [],
      newsProgramMaleAnchorListArnold	= [],
      newsProgramMaleAnchorListJulius	= [];

  var newsProgramFemaleAnchorCountForKorina		= 0,
      newsProgramFemaleAnchorCountForMel			= 0,
      newsProgramFemaleAnchorCountForJessica	= 0,
      newsProgramFemaleAnchorCountForCheryl		= 0,
      newsProgramFemaleAnchorCountForKaren		= 0;

  var newsProgramFemaleAnchorListKorina		= [],
      newsProgramFemaleAnchorListMel			= [],
      newsProgramFemaleAnchorListJessica	= [],
      newsProgramFemaleAnchorListCheryl		= [],
      newsProgramFemaleAnchorListKaren		= [];

  var newsPublicAffairsTalkShowCountForBottomline					= 0,
      newsPublicAffairsTalkShowCountForTonightWithArnold	= 0,
      newsPublicAffairsTalkShowCountForTunayNaBuhay				= 0,
      newsPublicAffairsTalkShowCountForTapantanNiTunying	= 0;

  var newsPublicAffairsTalkShowListBottomline					= [],
      newsPublicAffairsTalkShowListTonightWithArnold	= [],
      newsPublicAffairsTalkShowListTunayNaBuhay				= [],
      newsPublicAffairsTalkShowListTapantanNiTunying	= [];

  var magazineShowCountForRatedK	= 0,
      magazineShowCountForKMJS		= 0,
      magazineShowCountForBND			= 0;

  var magazineShowListRatedK	= [],
      magazineShowListKMJS		= [],
      magazineShowListBND			= [];

  var magazineShowHostCountForKorina	= 0,
      magazineShowHostCountForJessica	= 0,
      magazineShowHostCountForDrew		= 0;

  var magazineShowHostListKorina	= [],
      magazineShowHostListJessica	= [],
      magazineShowHostListDrew		= [];

  var investigativeShowCountForSOCO												= 0,
      investigativeShowCountForImbestigador								= 0,
      investigativeShowCountForTutokTulfo									= 0,
      investigativeShowCountForInvestigativeDocumentaries	= 0,
      investigativeShowCountForFailonNgayon								= 0;

  var investigativeShowListSOCO												= [],
      investigativeShowListImbestigador								= [],
      investigativeShowListTutokTulfo									= [],
      investigativeShowListInvestigativeDocumentaries	= [],
      investigativeShowListFailonNgayon								= [];

  var educationShowCountForMatanglawin	= 0,
      educationShowCountForKaps					= 0,
      educationShowCountForIbilib				= 0,
      educationShowCountForSalamatDoc		= 0,
      educationShowCountForBornWild			= 0;

  var educationShowListMatanglawin	= [],
      educationShowListKaps					= [],
      educationShowListIbilib				= [],
      educationShowListSalamatDoc		= [],
      educationShowListBornWild			= [];

  var documentaryShowCountForIWitness						= 0,
      documentaryShowCountForReportersNotebook	= 0,
      documentaryShowCountForFrontrow						= 0;

  var documentaryShowListIWitness						= [],
      documentaryShowListReportersNotebook	= [],
      documentaryShowListFrontrow						= [];

  var localTVStationCountForCLTV36					= 0,
      localTVStationCountForPEPTV						= 0,
      localTVStationCountForABSCBNPampanga	= 0,
      localTVStationCountForGNN44						= 0;

  var localTVStationListCLTV36					= [],
      localTVStationListPEPTV						= [],
      localTVStationListABSCBNPampanga	= [],
      localTVStationListGNN44						= [];

  var TVStationCountForABSCBN 	= 0,
      TVStationCountForGMA 		 	= 0,
      TVStationCountForTV5		 	= 0;

  var TVStationListABSCBN 	= [],
      TVStationListGMA 		 	= [],
      TVStationListTV5		 	= [];

  mongo('paragala', function (db) {
    db.open(function (err, db) {
      db.collection('student').find().toArray(function (err, doc) {

        if(err) throw err

        _.each(doc, function (docs) {
            if( docs.data == undefined ) return;

            //bestActorCategory
            if( docs.data.MainCategory[0].subCategory[0].data == "Jericho Rosales in The Legal Wife (ABS-CBN)" ) {
              actorCountForJericho += 1;
              actorListJericho.push(docs._id)
            } else if(  docs.data.MainCategory[0].subCategory[0].data == "Alden Richard in Carmela (GMA)" ) {
              actorCountForAlden += 1;
              actorListAlden.push(docs._id)
            } else if(  docs.data.MainCategory[0].subCategory[0].data == "Coco Martin in Ikaw Lamang (ABS-CBN)" ) {
              actorCountForCoco += 1;
              actorListCoco.push(docs._id)
            } else if(  docs.data.MainCategory[0].subCategory[0].data == "Aljur Abrenica in Kambal Sirena (GMA)" ) {
              actorCountForAljur += 1;
              actorListAljur.push(docs._id)
            } else if(  docs.data.MainCategory[0].subCategory[0].data == "Enrique Gil in Mirabella (ABS-CBN)" ) {
              actorCountForEnrique += 1;
              actorListEnrique.push(docs._id)
            } else if(  docs.data.MainCategory[0].subCategory[0].data == "Paulo Avelino in Sana Bukas pa ang Kahapon (ABS-CBN)" ) {
              actorCountForPaulo += 1;
              actorListPaulo.push(docs._id)
            } else if(  docs.data.MainCategory[0].subCategory[0].data == "Richard Yap in Be Carefull with my Heart (ABS-CBN)" ) {
              actorCountForRichard += 1;
              actorListRichard.push(docs._id)
            } else if(  docs.data.MainCategory[0].subCategory[0].data == "Alwyn Uytingco in Beki Boxer (TV5)" ) {
              actorCountForAlwyn += 1;
              actorListAlwyn.push(docs._id)
            }

            //bestActressCategory
            if( docs.data.MainCategory[0].subCategory[1].data == "Angel Locsin in The Legal Wife (ABS-CBN)" ) {
              actressCountForAngel += 1;
              actressListAngel.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[1].data == "Maja Salvador in The Legal Wife (ABS-CBN)" ) {
              actressCountForMaja += 1;
              actressListMaja.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[1].data == "Marian Rivera in Carmela (GMA)" ) {
              actressCountForMarian += 1;
              actressListMarian.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[1].data == "Jennylyn Mercado in Rhodora X (GMA)" ) {
              actressCountForJen += 1;
              actressListJen.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[1].data == "Anne Curtis in Dyesebel (ABS-CBN)" ) {
              actressCountForAnn += 1;
              actressListAnn.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[1].data == "Jodi Sta Maria in Be Carefull with my Heart (ABS-CBN)" ) {
              actressCountForJodi += 1;
              actressListJodi.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[1].data == "Bea Alonzo in Sana Bukas pa ang Kahapon (ABS-CBN)" ) {
              actressCountForBea += 1;
              actressListBea.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[1].data == "Kim Chui in Ikaw Lamang (ABS-CBN)" ) {
              actressCountForKim += 1;
              actressListKim.push(docs._id)
            }

            //bestMaleChildPerformer
            if( docs.data.MainCategory[0].subCategory[2].data == 'James "Bimbi" Yap in My little Bossings' ) {
              maleChildPerformerCountForBimbi += 1;
              maleChildPerformerListBimbi.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[2].data == "David Remo in Nino (GMA)" ) {
              maleChildPerformerCountForRemo += 1;
              maleChildPerformerListRemo.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[2].data == "JM Ibanez in Be Careful with my Heart (ABS-CBN)" ) {
              maleChildPerformerCountForJM += 1;
              maleChildPerformerListJM.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[2].data == "Clarrence Delgado in Home Sweetie Home (ABS-CBN)" ) {
              maleChildPerformerCountForClarence += 1;
              maleChildPerformerListClarence.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[2].data == "Bugoy Carino in Goin Bulilit (ABS-CBN)" ) {
              maleChildPerformerCountForBugoy += 1;
              maleChildPerformerListBugoy.push(docs._id)
            }

            //bestFemaleChildPerformer
            if( docs.data.MainCategory[0].subCategory[3].data == 'Ryzza Mae Dizon in My little Bossings' ) {
              femaleChildPerformerCountForRyzza += 1;
              femaleChildPerformerListRyzza.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[3].data == 'Xyriel Manabat in Wansapanataym (ABS-CBN)' ) {
              femaleChildPerformerCountForXyriel += 1;
              femaleChildPerformerListXyriel.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[3].data == 'Jillian Ward in Kambal Sirena (GMA)' ) {
              femaleChildPerformerCountForJillian +=1;
              femaleChildPerformerListJillian.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[3].data == 'Mutya Orquia in Be Careful with my Heart (ABS-CBN)' ) {
              femaleChildPerformerCountForMutya += 1;
              femaleChildPerformerListMutya.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[3].data == 'Rhed Bustamante in The Borrowed Wife (GMA)' ) {
              femaleChildPerformerCountForRhed += 1;
              femaleChildPerformerListRhed.push(docs._id)
            }

            //bestTeleserye
            if( docs.data.MainCategory[0].subCategory[4].data == 'The Legal Wife (ABS-CBN)' ) {
              teleseryeCountForLegalWife += 1;
              teleseryeListLegalWife.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[4].data == 'Rhodora X (GMA)' ) {
              teleseryeCountForRhodora += 1;
              teleseryeListRhodora.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[4].data == 'Carmela (GMA)' ) {
              teleseryeCountForCarmela += 1;
              teleseryeListCarmela.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[4].data == 'Ikaw Lamang (ABS-CBN)' ) {
              teleseryeCountForIkawLamang += 1;
              teleseryeListIkawLamang.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[4].data == 'Dyesebel (ABS-CBN)' ) {
              teleseryeCountForDyesebel += 1;
              teleseryeListDyesebel.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[4].data == 'Beki Boxer (TV5)' ) {
              teleseryeCountForBekiBoxer += 1;
              teleseryeListBekiBoxer.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[4].data == 'Be Careful with my Heart (ABS-CBN)' ) {
              teleseryeCountForBeCareful += 1;
              teleseryeListBeCareful.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[4].data == 'Sana Bukas pa ang Kahapon (ABS-CBN)' ) {
              teleseryeCountForBukasPaAngKahapon += 1;
              teleseryeListBukasPaAngKahapon.push(docs._id)
            }

            //bestSitcom
            if( docs.data.MainCategory[0].subCategory[5].data == 'Home Sweetie Home (ABS-CBN)' ) {
              sitComCountForHomeSweetie += 1;
              sitComListHomeSweetie.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[5].data == 'Vampire ang Daddy ko (GMA)' ) {
              sitComCountForVampire += 1;
              sitComListVampire.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[5].data == 'Pepito Manoloto (GMA)' ) {
              sitComCountForPepito += 1;
              sitComListPepito.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[5].data == 'Confessions of a Torpe (TV5)' ) {
              sitComCountForConfessions += 1;
              sitComListConfessions.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[5].data == 'One of the Boys (TV5)' ) {
              sitComCountForOneOfBoys += 1;
              sitComListOneOfBoys.push(docs._id)
            }

            //BestGagShow
            if( docs.data.MainCategory[0].subCategory[6].data == 'Bubble Gang (GMA)' ) {
              gagShowCountForBubleGang += 1;
              gagShowListBubleGang.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[6].data == 'Banana Split (ABS-CBN)' ) {
              gagShowCountForBanana += 1;
              gagShowListBanana.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[6].data == "Goin' Bulilit (ABS-CBN)" ) {
              gagShowCountForBulilit += 1;
              gagShowListBulilit.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[6].data == 'Wow Mali Pa Rin! (TV5)' ) {
              gagShowCountForWowMali += 1;
              gagShowListWowMali.push(docs._id)
            }

            //BestMusicalVarietyShow
            if( docs.data.MainCategory[0].subCategory[7].data == 'A.S.A.P. (ABS-CBN)' ) {
              musicalVarietyCountForASAP += 1;
              musicalVarietyListASAP.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[7].data == 'Sunday All Stars (GMA)' ) {
              musicalVarietyCountForSundayAllStars += 1;
              musicalVarietyListSundayAllStars.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[7].data == 'Walang Tulugan (GMA)' ) {
              musicalVarietyCountForWalangTulugan += 1;
              musicalVarietyListWalangTulugan.push(docs._id)
            }

            //bestTalkShow
            if( docs.data.MainCategory[0].subCategory[8].data == 'KrisTV (ABS-CBN)' ) {
              talkShowCountForKrisTV += 1;
              talkShowListKrisTV.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[8].data == 'Gandang Gabi Vice (ABS-CBN)' ) {
              talkShowCountForGGV += 1;
              talkShowListGGV.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[8].data == 'Mars (GMA)' ) {
              talkShowCountForMars += 1;
              talkShowListMars.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[8].data == 'The Ryzza Mae Show (GMA)' ) {
              talkShowCountForRyzzaMae += 1;
              talkShowListRyzzaMae.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[8].data == 'Face The People (TV5)' ) {
              talkShowCountForFacePeople += 1;
              talkShowListFacePeople.push(docs._id)
            }

            //bestTalkShowHost
            if( docs.data.MainCategory[0].subCategory[9].data == 'Kris Aquino in KrisTV (ABS-CBN)' ) {
              talkShowHostCountForKris += 1;
              talkShowHostListKris.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[9].data == 'Vice Ganda in Gandang Gabi Vice (ABS-CBN)' ) {
              talkShowHostCountForViceGanda += 1;
              talkShowHostListViceGanda.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[9].data == 'Camille Prats in Mars (GMA)' ) {
              talkShowHostCountForCamille += 1;
              talkShowHostListCamille.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[9].data == 'Ryzza Mae Dizon in The Ryzza Mae Show (GMA)' ) {
              talkShowHostCountForRyzzaMae += 1;
              talkShowHostListRyzzaMae.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[9].data == 'Gelli De Bellen in Face The People (TV5)' ) {
              talkShowHostCountForGelli += 1;
              talkShowHostListGelli.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[9].data == 'Toni Gonzaga in The Buzz (ABS-CBN)' ) {
              talkShowHostCountForToni += 1;
              talkShowHostListToni.push(docs._id)
            }

            //bestEntertainmentNewsProgram
            if( docs.data.MainCategory[0].subCategory[10].data == 'The Buzz (ABS-CBN)' ) {
              entertainmentNewsProgramCountForTheBuzz += 1;
              entertainmentNewsProgramListTheBuzz.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[10].data == 'Startalk (GMA)' ) {
              entertainmentNewsProgramCountForStarTalk += 1;
              entertainmentNewsProgramListStarTalk.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[10].data == 'Showbiz Police (TV5)' ) {
              entertainmentNewsProgramCountForShowbizPolice += 1;
              entertainmentNewsProgramListShowbizPolice.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[10].data == 'Aquino and Abunda Tonight (ABS-CBN)' ) {
              entertainmentNewsProgramCountForAquinoAndAbunda += 1;
              entertainmentNewsProgramListAquinoAndAbunda.push(docs._id)
            }

            //bestEntertainmentNewsProgramHost
            if( docs.data.MainCategory[0].subCategory[11].data == 'Kris Aquino in Aquino and Abunda Tonight (ABS-CBN)' ) {
              entertainmentNewsProgramHostCountForKris += 1;
              entertainmentNewsProgramHostListKris.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[11].data == 'Boy Abunda in The Buzz (ABS-CBN)' ) {
              entertainmentNewsProgramHostCountForBoy += 1;
              entertainmentNewsProgramHostListBoy.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[11].data == 'Joey De Leon in Startalk (GMA)' ) {
              entertainmentNewsProgramHostCountForJoey += 1;
              entertainmentNewsProgramHostListJoey.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[11].data == 'Raymond Gutierrez in Showbiz Police (TV5)' ) {
              entertainmentNewsProgramHostCountForRaymond += 1;
              entertainmentNewsProgramHostListRaymond.push(docs._id)
            }

            //bestVarietyShow
            if( docs.data.MainCategory[0].subCategory[12].data == 'Showtime (ABS-CBN)' ) {
              varietyShowCountForShowTime += 1;
              varietyShowListShowTime.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[12].data == 'Eat Bulaga (GMA)' ) {
              varietyShowCountForEatBulaga += 1;
              varietyShowListEatBulaga.push(docs._id)
            }

            //bestVarietyShowHost
            if( docs.data.MainCategory[0].subCategory[13].data == 'Vice Ganda in Showtime (ABS-CBN)' ) {
              variteyShowHostCountForViceGanda += 1;
              variteyShowHostListViceGanda.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[13].data == 'Anne Curtis in Showtime (ABS-CBN)' ) {
              variteyShowHostCountForAnn += 1;
              variteyShowHostListAnn.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[13].data == 'Vic Sotto in Eat Bulaga (GMA)' ) {
              variteyShowHostCountForVic += 1;
              variteyShowHostListVic.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[13].data == 'Joey De Leon in Eat Bulaga (GMA)' ) {
              variteyShowHostCountForJoey += 1;
              variteyShowHostListJoey.push(docs._id)
            }

            //bestGameShow
            if( docs.data.MainCategory[0].subCategory[14].data == 'Bet on your Baby (ABS-CBN)' ) {
              gameShowCountForBetOnYourBaby += 1;
              gameShowListBetOnYourBaby.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[14].data == 'Singing Bee (ABS-CBN)' ) {
              gameShowCountForSingingBee += 1;
              gameShowListSingingBee.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[14].data == 'Picture, Picture (GMA)' ) {
              gameShowCountForPicture += 1;
              gameShowListPicture.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[14].data == 'Celebrity Bluff (GMA)' ) {
              gameShowCountForCelebrityBluff += 1;
              gameShowListCelebrityBluff.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[14].data == 'Who Wants to be a Millionaire (TV5)' ) {
              gameShowCountForMillionaire += 1;
              gameShowListMillionaire.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[14].data == 'Killer Karaoke (TV5)' ) {
              gameShowCountForKillerKaraoke += 1;
              gameShowListKillerKaraoke.push(docs._id)
            }

            //bestGameShowHost
            if( docs.data.MainCategory[0].subCategory[15].data == 'Judy Ann Santos-Agoncillo in Bet on your Baby (ABS-CBN)' ) {
              gameShowHostCountForJudyAnn += 1;
              gameShowHostListJudyAnn.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[15].data == 'Ryan Agoncillo in Picture, Picture (GMA)' ) {
              gameShowHostCountForRyan += 1;
              gameShowHostListRyan.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[15].data == 'Eugene Domingo in Celebrity Bluff (GMA)' ) {
              gameShowHostCountForEugene += 1;
              gameShowHostListEugene.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[15].data == 'Vic Sotto in Who Wants to be a Millionaire (TV5)' ) {
              gameShowHostCountForVic += 1;
              gameShowHostListVic.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[15].data == 'Michael V in Killer Karaoke (TV5)' ) {
              gameShowHostCountForMichael += 1;
              gameShowHostListMichael.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[15].data == 'Amy Perez in Singing Bee (ABS-CBN)' ) {
              gameShowHostCountForAmy += 1;
              gameShowHostListAmy.push(docs._id)
            }

            //bestDramaAnthology
            if( docs.data.MainCategory[0].subCategory[16].data == 'Maalaala Mo Kaya (ABS-CBN)' ) {
              dramaAnthologyCountForMaalala += 1;
              dramaAnthologyListMaalala.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[16].data == 'Magpakailanman (GMA)' ) {
              dramaAnthologyCountForMagpakailanman += 1;
              dramaAnthologyListMagpakailanman.push(docs._id)
            } else if( docs.data.MainCategory[0].subCategory[16].data == 'Minamahal (TV5)' ) {
              dramaAnthologyCountForMinamahal += 1;
              dramaAnthologyListMinamahal.push(docs._id)
            }

            //bestMorningShow
            if( docs.data.MainCategory[1].subCategory[0].data == 'Umagang Kay Ganda (ABS-CBN)' ) {
              morningShowCountForUmagangKayGanda += 1;
              morningShowListUmagangKayGanda.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[0].data == 'Unang Hirit (GMA)' ) {
              morningShowCountForUnangHirit += 1;
              morningShowListUnangHirit.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[0].data == 'Good Morning Club (TV5)' ) {
              morningShowCountForGoodMorningClub += 1;
              morningShowListGoodMorningClub.push(docs._id)
            }

            //bestMorningShowHost
            if( docs.data.MainCategory[1].subCategory[1].data == 'Anthony Taberna in Umagang Kay Ganda (ABS-CBN)' ) {
              morningShowHostCountForAnthony += 1;
              morningShowHostListAnthony.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[1].data == 'Bernadette Sembrano in Umagang Kay Ganda (ABS-CBN)' ) {
              morningShowHostCountForBernadette += 1;
              morningShowHostListBernadette.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[1].data == 'Arnold Clavio in Unang Hirit (GMA)' ) {
              morningShowHostCountForArnold += 1;
              morningShowHostListArnold.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[1].data == 'Rhea Santos in Unang Hirit (GMA)' ) {
              morningShowHostCountForRhea += 1;
              morningShowHostListRhea.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[1].data == 'Cheryl Cosim in Good Morning Club (TV5)' ) {
              morningShowHostCountForCheryl += 1;
              morningShowHostListCheryl.push(docs._id)
            }

            //bestNewsProgram
            if( docs.data.MainCategory[1].subCategory[2].data == 'TV Patrol (ABS-CBN)' ) {
              newsProgramCountForTVPatrol += 1;
              newsProgramListTVPatrol.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[2].data == '24 Oras (GMA)' ) {
              newsProgramCountFor24Oras += 1;
              newsProgramList24Oras.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[2].data == 'Bandila (ABS-CBN)' ) {
              newsProgramCountForBandila += 1;
              newsProgramListBandila.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[2].data == 'Saksi (GMA)' ) {
              newsProgramCountForSaksi += 1;
              newsProgramListSaksi.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[2].data == 'Aksyon (TV5)' ) {
              newsProgramCountForAksyon += 1;
              newsProgramListAksyon.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[2].data == 'State of the Nation (GMA)' ) {
              newsProgramCountForSONA += 1;
              newsProgramListSONA.push(docs._id)
            }

            //bestNewsProgramMaleAnchor
            if( docs.data.MainCategory[1].subCategory[3].data == 'Noli De Castro in TV Patrol (ABS-CBN)' ) {
              newsProgramMaleAnchorCountForNoli += 1;
              newsProgramMaleAnchorListNoli.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[3].data == 'Ted Failon in TV Patrol (ABS-CBN)' ) {
              newsProgramMaleAnchorCountForTed += 1;
              newsProgramMaleAnchorListTed.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[3].data == 'Mike Enriquez in 24 Oras (GMA)' ) {
              newsProgramMaleAnchorCountForMike += 1;
              newsProgramMaleAnchorListMike.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[3].data == 'Erwin Tulfo in Aksyon (TV5)' ) {
              newsProgramMaleAnchorCountForErwin += 1;
              newsProgramMaleAnchorListErwin.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[3].data == 'Arnold Clavio in Saksi (GMA)' ) {
              newsProgramMaleAnchorCountForArnold += 1;
              newsProgramMaleAnchorListArnold.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[3].data == 'Julius Babaw in Bandila (ABS-CBN)' ) {
              newsProgramMaleAnchorCountForJulius += 1;
              newsProgramMaleAnchorListJulius.push(docs._id)
            }

            //bestNewsProgramFemaleAnchor
            if( docs.data.MainCategory[1].subCategory[4].data == 'Korina Sanchez in TV Patrol (ABS-CBN)' ) {
              newsProgramFemaleAnchorCountForKorina += 1;
              newsProgramFemaleAnchorListKorina.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[4].data == 'Mel Tiangco in 24 Oras (GMA)' ) {
              newsProgramFemaleAnchorCountForMel += 1;
              newsProgramFemaleAnchorListMel.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[4].data == 'Jessica Soho in State of the Nation (GMA)' ) {
              newsProgramFemaleAnchorCountForJessica += 1;
              newsProgramFemaleAnchorListJessica.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[4].data == 'Cheryl Cosim in Aksyon (TV5)' ) {
              newsProgramFemaleAnchorCountForCheryl += 1;
              newsProgramFemaleAnchorListCheryl.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[4].data == 'Karen Davila in Bandila (ABS-CBN)' ) {
              newsProgramFemaleAnchorCountForKaren += 1;
              newsProgramFemaleAnchorListKaren.push(docs._id)
            }

            //bestNewsPublicAffairsTalkShow
            if( docs.data.MainCategory[1].subCategory[5].data == 'Bottomline (ABS-CBN)' ) {
              newsPublicAffairsTalkShowCountForBottomline += 1;
              newsPublicAffairsTalkShowListBottomline.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[5].data == 'Tonight with Arnold Clavio (GMA)' ) {
              newsPublicAffairsTalkShowCountForTonightWithArnold += 1;
              newsPublicAffairsTalkShowListTonightWithArnold.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[5].data == 'Tunay na Buhay (GMA)' ) {
              newsPublicAffairsTalkShowCountForTunayNaBuhay += 1;
              newsPublicAffairsTalkShowListTunayNaBuhay.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[5].data == 'Tapatan Ni Tunying (ABS-CBN)' ) {
              newsPublicAffairsTalkShowCountForTapantanNiTunying += 1;
              newsPublicAffairsTalkShowListTapantanNiTunying.push(docs._id)
            }

            //bestMagazineShow
            if( docs.data.MainCategory[1].subCategory[6].data == 'Rated K (ABS-CBN)' ) {
              magazineShowCountForRatedK += 1;
              magazineShowListRatedK.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[6].data == 'Kapuso mo, Jessica Soho (GMA)' ) {
              magazineShowCountForKMJS += 1;
              magazineShowListKMJS.push(docs._id)
            }  else if( docs.data.MainCategory[1].subCategory[6].data == 'Biyahe ni Drew (GMA)' ) {
              magazineShowCountForBND += 1;
              magazineShowListBND.push(docs._id)
            }

            //bestMagazineShowHost
            if( docs.data.MainCategory[1].subCategory[7].data == 'Korina Sanchez in Rated K (ABS-CBN)' ) {
              magazineShowHostCountForKorina += 1;
              magazineShowHostListKorina.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[7].data == 'Jessica Soho in Kapuso mo, Jessica Soho (GMA)' ) {
              magazineShowHostCountForJessica += 1;
              magazineShowHostListJessica.push(docs._id)
            }  else if( docs.data.MainCategory[1].subCategory[7].data == 'Drew Arellano in Biyahe ni Drew (GMA)' ) {
              magazineShowHostCountForDrew += 1;
              magazineShowHostListDrew.push(docs._id)
            }

            //bestInvestigationShow
            if( docs.data.MainCategory[1].subCategory[8].data == 'Scene of the Crime Operatives (ABS-CBN)' ) {
              investigativeShowCountForSOCO += 1;
              investigativeShowListSOCO.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[8].data == 'Imbestigador (GMA)' ) {
              investigativeShowCountForImbestigador+= 1;
              investigativeShowListImbestigador.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[8].data == 'Tutok Tulfo (TV5)' ) {
              investigativeShowCountForTutokTulfo += 1;
              investigativeShowListTutokTulfo.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[8].data == 'Investigative Documentaries (GMA)' ) {
              investigativeShowCountForInvestigativeDocumentaries += 1;
              investigativeShowListInvestigativeDocumentaries.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[8].data == 'Failon Ngayon (ABS-CBN)' ) {
              investigativeShowCountForFailonNgayon += 1;
              investigativeShowListFailonNgayon.push(docs._id)
            }

            //bestEducationShow
            if( docs.data.MainCategory[1].subCategory[9].data == 'Matanglawin (ABS-CBN)' ) {
              educationShowCountForMatanglawin += 1;
              educationShowListMatanglawin.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[9].data == "Kap's Amazing Story (GMA)" ) {
              educationShowCountForKaps += 1;
              educationShowListKaps.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[9].data == "Ibilib (GMA)" ) {
              educationShowCountForIbilib += 1;
              educationShowListIbilib.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[9].data == "Salamat Doc (ABS-CBN)" ) {
              educationShowCountForSalamatDoc += 1;
              educationShowListSalamatDoc.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[9].data == "Born to be Wild (GMA)" ) {
              educationShowCountForBornWild += 1;
              educationShowListBornWild.push(docs._id)
            }

            //bestDocumentaryShow
            if( docs.data.MainCategory[1].subCategory[10].data == 'I-Witness (GMA)' ) {
              documentaryShowCountForIWitness += 1;
              documentaryShowListIWitness.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[10].data == "Reporter's Notebook (GMA)" ) {
              documentaryShowCountForReportersNotebook += 1;
              documentaryShowListReportersNotebook.push(docs._id)
            } else if( docs.data.MainCategory[1].subCategory[10].data == "Frontrow (GMA)" ) {
              documentaryShowCountForFrontrow += 1;
              documentaryShowListFrontrow.push(docs._id)
            }

            //bestLocalTVStation
            if( docs.data.MainCategory[2].subCategory[0].data == 'CLTV36' ) {
              localTVStationCountForCLTV36 += 1;
              localTVStationListCLTV36.push(docs._id)
            } else if( docs.data.MainCategory[2].subCategory[0].data == "PEP TV" ) {
              localTVStationCountForPEPTV += 1;
              localTVStationListPEPTV.push(docs._id)
            } else if( docs.data.MainCategory[2].subCategory[0].data == "ABS-CBN Pampanga" ) {
              localTVStationCountForABSCBNPampanga += 1;
              localTVStationListABSCBNPampanga.push(docs._id)
            } else if( docs.data.MainCategory[2].subCategory[0].data == "GNN 44 Informax" ) {
              localTVStationCountForGNN44 += 1;
              localTVStationListGNN44.push(docs._id)
            }

            //bestTVStation
            if( docs.data.MainCategory[2].subCategory[1].data == 'ABS-CBN' ) {
              TVStationCountForABSCBN += 1;
              TVStationListABSCBN.push(docs._id)
            } else if( docs.data.MainCategory[2].subCategory[1].data == "GMA" ) {
              TVStationCountForGMA += 1;
              TVStationListGMA.push(docs._id)
            } else if( docs.data.MainCategory[2].subCategory[1].data == "TV5" ) {
              TVStationCountForTV5 += 1;
              TVStationListTV5.push(docs._id)
            }
        })

        var data = {
          results: {
            bestActor: [{
                title: "Best Television Actor",
                name: 'Jericho Rosales in The Legal Wife (ABS-CBN)',
                count: actorCountForJericho,
                list: actorListJericho
              }, {
                title: "Best Television Actor",
                name: 'Alden Richard in Carmela (GMA)',
                count: actorCountForAlden,
                list: actorListAlden
              }, {
                title: "Best Television Actor",
                name: 'Coco Martin in Ikaw Lamang (ABS-CBN)',
                count: actorCountForCoco,
                list: actorListCoco
              }, {
                title: "Best Television Actor",
                name: 'Aljur Abrenica in Kambal Sirena (GMA)',
                count: actorCountForAljur,
                list: actorListAljur
              }, {
                title: "Best Television Actor",
                name: 'Enrique Gil in Mirabella (ABS-CBN)',
                count: actorCountForEnrique,
                list: actorListEnrique
              }, {
                title: "Best Television Actor",
                name: 'Paulo Avelino in Sana Bukas pa ang Kahapon (ABS-CBN)',
                count: actorCountForPaulo,
                list: actorListPaulo
              }, {
                title: "Best Television Actor",
                name: 'Richard Yap in Be Carefull with my Heart (ABS-CBN)',
                count: actorCountForRichard,
                list: actorListRichard
              }, {
                title: "Best Television Actor",
                name: 'Alwyn Uytingco in Beki Boxer (TV5)',
                count: actorCountForAlwyn,
                list: actorListAlwyn
            }],
            bestActress: [{
                title: "Best Television Actress",
                name: "Angel Locsin in The Legal Wife (ABS-CBN)",
                count: actressCountForAngel,
                list: actressListAngel
              }, {
                title: "Best Television Actress",
                name: "Maja Salvador in The Legal Wife (ABS-CBN)",
                count: actressCountForMaja,
                list: actressListMaja
              }, {
                title: "Best Television Actress",
                name: "Marian Rivera in Carmela (GMA)",
                count: actressCountForMarian,
                list: actressListMarian
              }, {
                title: "Best Television Actress",
                name: "Jennylyn Mercado in Rhodora X (GMA)",
                count: actressCountForJen,
                list: actressListJen
              }, {
                title: "Best Television Actress",
                name: "Anne Curtis in Dyesebel (ABS-CBN)",
                count: actressCountForAnn,
                list: actressListAnn
              }, {
                title: "Best Television Actress",
                name: "Jodi Sta Maria in Be Carefull with my Heart (ABS-CBN)",
                count: actressCountForJodi,
                list: actressListJodi
              }, {
                title: "Best Television Actress",
                name: "Bea Alonzo in Sana Bukas pa ang Kahapon (ABS-CBN)",
                count: actressCountForBea,
                list: actressListBea
              }, {
                title: "Best Television Actress",
                name: "Kim Chui in Ikaw Lamang (ABS-CBN)",
                count: actressCountForKim,
                list: actressListKim
            }],
            bestMaleChildPerformer: [{
                title: "Best Male Child Performer",
                name: 'James "Bimbi" Yap in My little Bossings',
                count: maleChildPerformerCountForBimbi,
                list: maleChildPerformerListBimbi
              }, {
                title: "Best Male Child Performer",
                name: 'David Remo in Nino (GMA)',
                count: maleChildPerformerCountForRemo,
                list: maleChildPerformerListRemo
              }, {
                title: "Best Male Child Performer",
                name: 'JM Ibanez in Be Careful with my Heart (ABS-CBN)',
                count: maleChildPerformerCountForJM,
                list: maleChildPerformerListJM
              }, {
                title: "Best Male Child Performer",
                name: 'Clarrence Delgado in Home Sweetie Home (ABS-CBN)',
                count: maleChildPerformerCountForClarence,
                list: maleChildPerformerListClarence
              }, {
                title: "Best Male Child Performer",
                name: 'Bugoy Carino in Goin Bulilit (ABS-CBN)',
                count: maleChildPerformerCountForBugoy,
                list: maleChildPerformerListBugoy
            }],
            bestFemaleChildPerformer: [{
                title: "Best Female Child Performer",
                name: "Ryzza Mae Dizon in My little Bossings",
                count: femaleChildPerformerCountForRyzza,
                list: femaleChildPerformerListRyzza
              }, {
                title: "Best Female Child Performer",
                name: "Xyriel Manabat in Wansapanataym (ABS-CBN)",
                count: femaleChildPerformerCountForXyriel,
                list: femaleChildPerformerListXyriel
              }, {
                title: "Best Female Child Performer",
                name: "Jillian Ward in Kambal Sirena (GMA)",
                count: femaleChildPerformerCountForJillian,
                list: femaleChildPerformerListJillian
              }, {
                title: "Best Female Child Performer",
                name: "Mutya Orquia in Be Careful with my Heart (ABS-CBN)",
                count: femaleChildPerformerCountForMutya,
                list: femaleChildPerformerListMutya
              }, {
                title: "Best Female Child Performer",
                name: "Rhed Bustamante in The Borrowed Wife (GMA)",
                count: femaleChildPerformerCountForRhed,
                list: femaleChildPerformerListRhed
            }],
            bestTeleserye: [{
                title: "Best Teleserye",
                name: "The Legal Wife (ABS-CBN)",
                count: teleseryeCountForLegalWife,
                list: teleseryeListLegalWife
              }, {
                title: "Best Teleserye",
                name: "Rhodora X (GMA)",
                count: teleseryeCountForRhodora,
                list: teleseryeListRhodora
              }, {
                title: "Best Teleserye",
                name: "Carmela (GMA)",
                count: teleseryeCountForCarmela,
                list: teleseryeListCarmela
              }, {
                title: "Best Teleserye",
                name: "Ikaw Lamang (ABS-CBN)",
                count: teleseryeCountForIkawLamang,
                list: teleseryeListIkawLamang
              }, {
                title: "Best Teleserye",
                name: "Dyesebel (ABS-CBN)",
                count: teleseryeCountForDyesebel,
                list: teleseryeListDyesebel
              }, {
                title: "Best Teleserye",
                name: "Beki Boxer (TV5)",
                count: teleseryeCountForBekiBoxer,
                list: teleseryeListBekiBoxer
              }, {
                title: "Best Teleserye",
                name: "Be Careful with my Heart (ABS-CBN)",
                count: teleseryeCountForBeCareful,
                list: teleseryeListBeCareful
              }, {
                title: "Best Teleserye",
                name: "Sana Bukas pa ang Kahapon (ABS-CBN)",
                count: teleseryeCountForBukasPaAngKahapon,
                list: teleseryeListBukasPaAngKahapon
            }],
            bestSitcom: [{
                title: "Best Sitcom",
                name: "Home Sweetie Home (ABS-CBN)",
                count: sitComCountForHomeSweetie,
                list: sitComListHomeSweetie
              }, {
                title: "Best Sitcom",
                name: "Vampire ang Daddy ko (GMA)",
                count: sitComCountForVampire,
                list: sitComListVampire
              }, {
                title: "Best Sitcom",
                name: "Pepito Manoloto (GMA)",
                count: sitComCountForPepito,
                list: sitComListPepito
              }, {
                title: "Best Sitcom",
                name: "Confessions of a Torpe (TV5)",
                count: sitComCountForConfessions,
                list: sitComListConfessions
              }, {
                title: "Best Sitcom",
                name: "One of the Boys (TV5)",
                count: sitComCountForOneOfBoys,
                list: sitComListOneOfBoys
            }],
            bestGagShow: [{
                title: "Best Gag Show",
                name: "Bubble Gang (GMA)",
                count: gagShowCountForBubleGang,
                list: gagShowListBubleGang
              }, {
                title: "Best Gag Show",
                name: "Banana Split (ABS-CBN)",
                count: gagShowCountForBanana,
                list: gagShowListBanana
              }, {
                title: "Best Gag Show",
                name: "Goin' Bulilit (ABS-CBN)",
                count: gagShowCountForBulilit,
                list: gagShowListBulilit
              }, {
                title: "Best Gag Show",
                name: "Wow Mali Pa Rin! (TV5)",
                count: gagShowCountForWowMali,
                list: gagShowListWowMali
            }],
            bestMusicalVarietyShow: [{
                title: "Best Musical Variety Show",
                name: "A.S.A.P. (ABS-CBN)",
                count: musicalVarietyCountForASAP,
                list: musicalVarietyListASAP
              }, {
                title: "Best Musical Variety Show",
                name: "Sunday All Stars (GMA)",
                count: musicalVarietyCountForSundayAllStars,
                list: musicalVarietyListSundayAllStars
              }, {
                title: "Best Musical Variety Show",
                name: "Walang Tulugan (GMA)",
                count: musicalVarietyCountForWalangTulugan,
                list: musicalVarietyListWalangTulugan
            }],
            bestTalkShow: [{
                title: "Best Talk Show",
                name: "KrisTV (ABS-CBN)",
                count: talkShowCountForKrisTV,
                list: talkShowListKrisTV
              }, {
                title: "Best Talk Show",
                name: "Gandang Gabi Vice (ABS-CBN)",
                count: talkShowCountForGGV,
                list: talkShowListGGV
              }, {
                title: "Best Talk Show",
                name: "Mars (GMA)",
                count: talkShowCountForMars,
                list: talkShowListMars
              }, {
                title: "Best Talk Show",
                name: "The Ryzza Mae Show (GMA)",
                count: talkShowCountForRyzzaMae,
                list: talkShowListRyzzaMae
              }, {
                title: "Best Talk Show",
                name: "Face The People (TV5",
                count: talkShowCountForFacePeople,
                list: talkShowListFacePeople
            }],
            bestTalkShowHost: [{
                title: "Best Talk Show Host",
                name: "Kris Aquino in KrisTV (ABS-CBN)",
                count: talkShowHostCountForKris,
                list: talkShowHostListKris
              }, {
                title: "Best Talk Show Host",
                name: "Vice Ganda in Gandang Gabi Vice (ABS-CBN)",
                count: talkShowHostCountForViceGanda,
                list: talkShowHostListViceGanda
              }, {
                title: "Best Talk Show Host",
                name: "Camille Prats in Mars (GMA)",
                count: talkShowHostCountForCamille,
                list: talkShowHostListCamille
              }, {
                title: "Best Talk Show Host",
                name: "Ryzza Mae Dizon in The Ryzza Mae Show (GMA)",
                count: talkShowHostCountForRyzzaMae,
                list: talkShowHostListRyzzaMae
              }, {
                title: "Best Talk Show Host",
                name: "Gelli De Bellen in Face The People (TV5)",
                count: talkShowHostCountForGelli,
                list: talkShowHostListGelli
              }, {
                title: "Best Talk Show Host",
                name: "Toni Gonzaga in The Buzz (ABS-CBN)",
                count: talkShowHostCountForToni,
                list: talkShowHostListToni
            }],
            bestEntertainmentNewsProgram: [{
                title: "Best Entertainment News Program Host",
                name: "The Buzz (ABS-CBN)",
                count: entertainmentNewsProgramCountForTheBuzz,
                list: entertainmentNewsProgramListTheBuzz
              }, {
                title: "Best Entertainment News Program Host",
                name: "Startalk (GMA)",
                count: entertainmentNewsProgramCountForStarTalk,
                list: entertainmentNewsProgramListStarTalk
              }, {
                title: "Best Entertainment News Program Host",
                name: "Showbiz Police (TV5)",
                count: entertainmentNewsProgramCountForShowbizPolice,
                list: entertainmentNewsProgramListShowbizPolice
              }, {
                title: "Best Entertainment News Program Host",
                name: "Aquino and Abunda Tonight (ABS-CBN)",
                count: entertainmentNewsProgramCountForAquinoAndAbunda,
                list: entertainmentNewsProgramListAquinoAndAbunda
            }],
            bestEntertainmentNewsProgramHost: [{
                title: "Best Entertainment News Program Host",
                name: "Kris Aquino in Aquino and Abunda Tonight (ABS-CBN)",
                count: entertainmentNewsProgramHostCountForKris,
                list: entertainmentNewsProgramHostListKris
              }, {
                title: "Best Entertainment News Program Host",
                name: "Boy Abunda in The Buzz (ABS-CBN)",
                count: entertainmentNewsProgramHostCountForBoy,
                list: entertainmentNewsProgramHostListBoy
              }, {
                title: "Best Entertainment News Program Host",
                name: "Joey De Leon in Startalk (GMA)",
                count: entertainmentNewsProgramHostCountForJoey,
                list: entertainmentNewsProgramHostListJoey
              }, {
                title: "Best Entertainment News Program Host",
                name: "Raymond Gutierrez in Showbiz Police (TV5)",
                count: entertainmentNewsProgramHostCountForRaymond,
                list: entertainmentNewsProgramHostListRaymond
            }],
            bestVarietyShow: [{
                title: "Best Variety Show",
                name: "Showtime (ABS-CBN)",
                count: varietyShowCountForShowTime,
                list: varietyShowListShowTime
              }, {
                title: "Best Variety Show",
                name: "Eat Bulaga (GMA)",
                count: varietyShowCountForEatBulaga,
                list: varietyShowListEatBulaga
            }],
            bestVarietyShowHost: [{
                title: "Best Variety Show Host",
                name: "Vice Ganda in Showtime (ABS-CBN)",
                count: variteyShowHostCountForViceGanda,
                list: variteyShowHostCountForViceGanda
              }, {
                title: "Best Variety Show Host",
                name: "Anne Curtis in Showtime (ABS-CBN)",
                count: variteyShowHostCountForAnn,
                list: variteyShowHostCountForAnn
              }, {
                title: "Best Variety Show Host",
                name: "Vic Sotto in Eat Bulaga (GMA)",
                count: variteyShowHostCountForVic,
                list: variteyShowHostCountForVic
              }, {
                title: "Best Variety Show Host",
                name: "Joey De Leon in Eat Bulaga (GMA)",
                count: variteyShowHostCountForJoey,
                list: variteyShowHostCountForJoey
            }],
            bestGameShow: [{
                title: "Best Game Show",
                name: "Bet on your Baby (ABS-CBN)",
                count: gameShowCountForBetOnYourBaby,
                list: gameShowListBetOnYourBaby
              }, {
                title: "Best Game Show",
                name: "Singing Bee (ABS-CBN)",
                count: gameShowCountForSingingBee,
                list: gameShowListSingingBee
              }, {
                title: "Best Game Show",
                name: "Picture, Picture (GMA)",
                count: gameShowCountForPicture,
                list: gameShowListPicture
              }, {
                title: "Best Game Show",
                name: "Celebrity Bluff (GMA)",
                count: gameShowCountForCelebrityBluff,
                list: gameShowListCelebrityBluff
              }, {
                title: "Best Game Show",
                name: "Who Wants to be a Millionaire (TV5)",
                count: gameShowCountForMillionaire,
                list: gameShowListMillionaire
              }, {
                title: "Best Game Show",
                name: "Killer Karaoke (TV5)",
                count: gameShowCountForKillerKaraoke,
                list: gameShowListKillerKaraoke
            }],
            bestGameShowHost: [{
                title: "Best Game Show Host",
                name: "Judy Ann Santos-Agoncillo in Bet on your Baby (ABS-CBN)",
                count: gameShowHostCountForJudyAnn,
                list: gameShowHostListJudyAnn
              }, {
                title: "Best Game Show Host",
                name: "Ryan Agoncillo in Picture, Picture (GMA)",
                count: gameShowHostCountForRyan,
                list: gameShowHostListRyan
              }, {
                title: "Best Game Show Host",
                name: "Eugene Domingo in Celebrity Bluff (GMA)",
                count: gameShowHostCountForEugene,
                list: gameShowHostListEugene
              }, {
                title: "Best Game Show Host",
                name: "Vic Sotto in Who Wants to be a Millionaire (TV5)",
                count: gameShowHostCountForVic,
                list: gameShowHostListVic
              }, {
                title: "Best Game Show Host",
                name: "Michael V in Killer Karaoke (TV5)",
                count: gameShowHostCountForMichael,
                list: gameShowHostListMichael
              }, {
                title: "Best Game Show Host",
                name: "Amy Perez in Singing Bee (ABS-CBN)",
                count: gameShowHostCountForAmy,
                list: gameShowHostListAmy
            }],
            bestDramaAnthology: [{
                title: "Best Drama Anthology",
                name: "Maalaala Mo Kaya (ABS-CBN)",
                count: dramaAnthologyCountForMaalala,
                list: dramaAnthologyListMaalala
              }, {
                title: "Best Drama Anthology",
                name: "Magpakailanman (GMA)",
                count: dramaAnthologyCountForMagpakailanman,
                list: dramaAnthologyListMagpakailanman
              }, {
                title: "Best Drama Anthology",
                name: "Minamahal (TV5)",
                count: dramaAnthologyCountForMinamahal,
                list: dramaAnthologyListMinamahal
            }],
            bestMorningShow: [{
                title: "Best Morning Show",
                name: "Umagang Kay Ganda (ABS-CBN)",
                count: morningShowCountForUmagangKayGanda,
                list: morningShowListUmagangKayGanda
              }, {
                title: "Best Morning Show",
                name: "Unang Hirit (GMA)",
                count: morningShowCountForUnangHirit,
                list: morningShowListUnangHirit
              }, {
                title: "Best Morning Show",
                name: "Good Morning Club (TV5)",
                count: morningShowCountForGoodMorningClub,
                list: morningShowListGoodMorningClub
            }],
            bestMorningShowHost: [{
                title: "Best Morning Show Host",
                name: "Anthony Taberna in Umagang Kay Ganda (ABS-CBN)",
                count: morningShowHostCountForAnthony,
                list: morningShowHostListAnthony
              }, {
                title: "Best Morning Show Host",
                name: "Bernadette Sembrano in Umagang Kay Ganda (ABS-CBN)",
                count: morningShowHostCountForBernadette,
                list: morningShowHostListBernadette
              }, {
                title: "Best Morning Show Host",
                name: "Arnold Clavio in Unang Hirit (GMA)",
                count: morningShowHostCountForArnold,
                list: morningShowHostListArnold
              }, {
                title: "Best Morning Show Host",
                name: "Rhea Santos in Unang Hirit (GMA)",
                count: morningShowHostCountForRhea,
                list: morningShowHostListRhea
              }, {
                title: "Best Morning Show Host",
                name: "Cheryl Cosim in Good Morning Club (TV5)",
                count: morningShowHostCountForCheryl,
                list: morningShowHostListCheryl
            }],
            bestNewsProgram: [{
                title: "Best News Program",
                name: "TV Patrol (ABS-CBN)",
                count: newsProgramCountForTVPatrol,
                list: newsProgramListTVPatrol
              }, {
                title: "Best News Program",
                name: "24 Oras (GMA)",
                count: newsProgramCountFor24Oras,
                list: newsProgramList24Oras
              }, {
                title: "Best News Program",
                name: "Bandila (ABS-CBN)",
                count: newsProgramCountForBandila,
                list: newsProgramListBandila
              }, {
                title: "Best News Program",
                name: "Saksi (GMA)",
                count: newsProgramCountForSaksi,
                list: newsProgramListSaksi
              }, {
                title: "Best News Program",
                name: "Aksyon (TV5)",
                count: newsProgramCountForAksyon,
                list: newsProgramListAksyon
              }, {
                title: "Best News Program",
                name: "State of the Nation (GMA)",
                count: newsProgramCountForSONA,
                list: newsProgramListSONA
            }],
            bestNewsProgramMaleAnchor: [{
                title: "Best News Program Male Anchor",
                name: "Noli De Castro in TV Patrol (ABS-CBN)",
                count: newsProgramMaleAnchorCountForNoli,
                list: newsProgramMaleAnchorListNoli
              }, {
                title: "Best News Program Male Anchor",
                name: "Ted Failon in TV Patrol (ABS-CBN)",
                count: newsProgramMaleAnchorCountForTed,
                list: newsProgramMaleAnchorListTed
              }, {
                title: "Best News Program Male Anchor",
                name: "Mike Enriquez in 24 Oras (GMA)",
                count: newsProgramMaleAnchorCountForMike,
                list: newsProgramMaleAnchorListMike
              }, {
                title: "Best News Program Male Anchor",
                name: "Erwin Tulfo in Aksyon (TV5)",
                count: newsProgramMaleAnchorCountForErwin,
                list: newsProgramMaleAnchorListErwin
              }, {
                title: "Best News Program Male Anchor",
                name: "Arnold Clavio in Saksi (GMA)",
                count: newsProgramMaleAnchorCountForArnold,
                list: newsProgramMaleAnchorListArnold
              }, {
                title: "Best News Program Male Anchor",
                name: "Julius Babaw in Bandila (ABS-CBN)",
                count: newsProgramMaleAnchorCountForJulius,
                list: newsProgramMaleAnchorListJulius
            }],
            bestNewsProgramFemaleAnchor: [{
                title: "Best News Program Female Anchor",
                name: "Korina Sanchez in TV Patrol (ABS-CBN)",
                count: newsProgramFemaleAnchorCountForKorina,
                list: newsProgramFemaleAnchorListKorina
              }, {
                title: "Best News Program Female Anchor",
                name: "Mel Tiangco in 24 Oras (GMA)",
                count: newsProgramFemaleAnchorCountForMel,
                list: newsProgramFemaleAnchorListMel
              }, {
                title: "Best News Program Female Anchor",
                name: "Jessica Soho in State of the Nation (GMA)",
                count: newsProgramFemaleAnchorCountForJessica,
                list: newsProgramFemaleAnchorListJessica
              }, {
                title: "Best News Program Female Anchor",
                name: "Cheryl Cosim in Aksyon (TV5)",
                count: newsProgramFemaleAnchorCountForCheryl,
                list: newsProgramFemaleAnchorListCheryl
              }, {
                title: "Best News Program Female Anchor",
                name: "Karen Davila in Bandila (ABS-CBN)",
                count: newsProgramFemaleAnchorCountForKaren,
                list: newsProgramFemaleAnchorListKaren
            }],
            bestNewsPublicAffairsTalkShow: [{
                title: "Best News Public Affairs Talk Show",
                name: "Bottomline (ABS-CBN)",
                count: newsPublicAffairsTalkShowCountForBottomline,
                list: newsPublicAffairsTalkShowListBottomline
              }, {
                title: "Best News Public Affairs Talk Show",
                name: "Tonight with Arnold Clavio (GMA)",
                count: newsPublicAffairsTalkShowCountForTonightWithArnold,
                list: newsPublicAffairsTalkShowListTonightWithArnold
              }, {
                title: "Best News Public Affairs Talk Show",
                name: "Tunay na Buhay (GMA)",
                count: newsPublicAffairsTalkShowCountForTunayNaBuhay,
                list: newsPublicAffairsTalkShowListTunayNaBuhay
              }, {
                title: "Best News Public Affairs Talk Show",
                name: "Tapatan Ni Tunying (ABS-CBN)",
                count: newsPublicAffairsTalkShowCountForTapantanNiTunying,
                list: newsPublicAffairsTalkShowListTapantanNiTunying
            }],
            bestMagazineShow: [{
                title: "Best Magazine Show",
                name: "Rated K (ABS-CBN)",
                count: magazineShowCountForRatedK,
                list: magazineShowListRatedK
              }, {
                title: "Best Magazine Show",
                name: "Kapuso mo, Jessica Soho (GMA)",
                count: magazineShowCountForKMJS,
                list: magazineShowListKMJS
              }, {
                title: "Best Magazine Show",
                name: "Biyahe ni Drew (GMA)",
                count: magazineShowCountForBND,
                list: magazineShowListBND
            }],
            bestMagazineShowHost: [{
                title: "Best Magazine Show Host",
                name: "Korina Sanchez in Rated K (ABS-CBN)",
                count: magazineShowHostCountForKorina,
                list: magazineShowHostListKorina
              }, {
                title: "Best Magazine Show Host",
                name: "Jessica Soho in Kapuso mo, Jessica Soho (GMA)",
                count: magazineShowHostCountForJessica,
                list: magazineShowHostListJessica
              }, {
                title: "Best Magazine Show Host",
                name: "Drew Arellano in Biyahe ni Drew (GMA)",
                count: magazineShowHostCountForDrew,
                list: magazineShowHostListDrew
            }],
            bestInvestigativeShow: [{
                title: "Best Investigative Show",
                name: "Scene of the Crime Operatives (ABS-CBN)",
                count: investigativeShowCountForSOCO,
                list: investigativeShowListSOCO
              }, {
                title: "Best Investigative Show",
                name: "Imbestigador (GMA)",
                count: investigativeShowCountForImbestigador,
                list: investigativeShowListImbestigador
              }, {
                title: "Best Investigative Show",
                name: "Tutok Tulfo (TV5)",
                count: investigativeShowCountForTutokTulfo,
                list: investigativeShowListTutokTulfo
              }, {
                title: "Best Investigative Show",
                name: "Investigative Documentaries (GMA)",
                count: investigativeShowCountForInvestigativeDocumentaries,
                list: investigativeShowListInvestigativeDocumentaries
              }, {
                title: "Best Investigative Show",
                name: "Failon Ngayon (ABS-CBN)",
                count: investigativeShowCountForFailonNgayon,
                list: investigativeShowListFailonNgayon
            }],
            bestEducationShow: [{
                title: "Best Education Show",
                name: "Matanglawin (ABS-CBN)",
                count: educationShowCountForMatanglawin,
                list: educationShowListMatanglawin
              }, {
                title: "Best Education Show",
                name: "Kap's Amazing Story (GMA)",
                count: educationShowCountForKaps,
                list: educationShowListKaps
              }, {
                title: "Best Education Show",
                name: "Ibilib (GMA)",
                count: educationShowCountForIbilib,
                list: educationShowListIbilib
              }, {
                title: "Best Education Show",
                name: "Salamat Doc (ABS-CBN)",
                count: educationShowCountForSalamatDoc,
                list: educationShowListSalamatDoc
              }, {
                title: "Best Education Show",
                name: "Born to be Wild (GMA)",
                count: educationShowCountForBornWild,
                list: educationShowListBornWild
            }],
            bestDocumentaryShow: [{
                title: "Best Documentary Show",
                name: "I-Witness (GMA)",
                count: documentaryShowCountForIWitness,
                list: documentaryShowListIWitness
              }, {
                title: "Best Documentary Show",
                name: "Reporter's Notebook (GMA)",
                count: documentaryShowCountForReportersNotebook,
                list: documentaryShowListReportersNotebook
              }, {
                title: "Best Documentary Show",
                name: "Frontrow (GMA)",
                count: documentaryShowCountForFrontrow,
                list: documentaryShowListFrontrow
            }],
            bestLocalTVStation: [{
                title: "Best Local TV Station",
                name: "CLTV36",
                count: localTVStationCountForCLTV36,
                list: localTVStationListCLTV36
              }, {
                title: "Best Local TV Station",
                name: "PEP TV",
                count: localTVStationCountForPEPTV,
                list: localTVStationListPEPTV
              }, {
                title: "Best Local TV Station",
                name: "ABS-CBN Pampanga",
                count: localTVStationCountForABSCBNPampanga,
                list: localTVStationListABSCBNPampanga
              }, {
                title: "Best Local TV Station",
                name: "GNN 44 Informax",
                count: localTVStationCountForGNN44,
                list: localTVStationListGNN44
            }],
            bestTVStation: [{
                title: "Best TV Station",
                name: "ABS-CBN",
                count: TVStationCountForABSCBN,
                list: TVStationListABSCBN
              }, {
                title: "Best TV Station",
                name: "GMA",
                count: TVStationCountForGMA,
                list: TVStationListGMA
              }, {
                title: "Best TV Station",
                name: "TV5",
                count: TVStationCountForTV5,
                list: TVStationListTV5
            }]
          }
        }

        out.push(data)
        function largest(array){
          return Math.max.apply(Math, array);
        }

        var actor = [actorCountForJericho, actorCountForAlden, actorCountForCoco, actorCountForAljur, actorCountForEnrique, actorCountForPaulo, actorCountForRichard, actorCountForAlwyn]
        var actorResult = []
        data.results.bestActor.forEach(function (response) {
          if(largest(actor) === response.count) {
            var winner = {
              actor: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            actorResult.push(winner)
          }
        })
        out.push(actorResult)


        var actress = [actressCountForAngel, actressCountForMaja, actressCountForMarian, actressCountForAnn, actressCountForJodi, actressCountForBea, actressCountForKim, actressCountForJen]
        var actressResult = []
        data.results.bestActress.forEach(function (response) {
          if(largest(actress) === response.count) {
            var winner = {
              actress: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            actressResult.push(winner)
          }
        })
        out.push(actressResult)

        var maleChildPerformer = [maleChildPerformerCountForBimbi, maleChildPerformerCountForRemo, maleChildPerformerCountForJM, maleChildPerformerCountForClarence, maleChildPerformerCountForBugoy]
        var maleChildPerformerResult = []
        data.results.bestMaleChildPerformer.forEach(function (response) {
          if(largest(maleChildPerformer) === response.count) {
            var winner = {
              maleChildPerformer: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            maleChildPerformerResult.push(winner)
          }
        })
        out.push(maleChildPerformerResult)

        var femaleChildPerformer = [femaleChildPerformerCountForRyzza, femaleChildPerformerCountForXyriel, femaleChildPerformerCountForMutya, femaleChildPerformerCountForRhed, femaleChildPerformerCountForJillian]
        var femaleChildPerformerResult = []
        data.results.bestFemaleChildPerformer.forEach(function (response) {
          if(largest(femaleChildPerformer) === response.count) {
            var winner = {
              femaleChildPerformer: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            femaleChildPerformerResult.push(winner)
          }
        })
        out.push(femaleChildPerformerResult)

        var teleserye = [teleseryeCountForLegalWife, teleseryeCountForRhodora, teleseryeCountForCarmela, teleseryeCountForIkawLamang, teleseryeCountForDyesebel, teleseryeCountForBekiBoxer, teleseryeCountForBeCareful, teleseryeCountForBukasPaAngKahapon]
        var teleseryeResult = []
        data.results.bestTeleserye.forEach(function (response) {
          if(largest(teleserye) === response.count) {
            var winner = {
              teleserye: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            teleseryeResult.push(winner)
          }
        })
        out.push(teleseryeResult)

        var sitCom = [sitComCountForHomeSweetie, sitComCountForVampire, sitComCountForPepito, sitComCountForConfessions, sitComCountForOneOfBoys]
        var sitComResult = []
        data.results.bestSitcom.forEach(function (response) {
          if(largest(sitCom) === response.count) {
            var winner = {
              sitCom: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            sitComResult.push(winner)
          }
        })
        out.push(sitComResult)

        var gagShow = [gagShowCountForBubleGang, gagShowCountForBanana, gagShowCountForBulilit, gagShowCountForWowMali]
        var gagShowResult = []
        data.results.bestGagShow.forEach(function (response) {
          if(largest(gagShow) === response.count) {
            var winner = {
              gagShow: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            gagShowResult.push(winner)
          }
        })
        out.push(gagShowResult)

        var musicalVarietyShow = [musicalVarietyCountForASAP, musicalVarietyCountForSundayAllStars, musicalVarietyCountForWalangTulugan]
        var musicalVarietyShowResult = []
        data.results.bestMusicalVarietyShow.forEach(function (response) {
          if(largest(musicalVarietyShow) === response.count) {
            var winner = {
              musicalVarietyShow: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            musicalVarietyShowResult.push(winner)
          }
        })
        out.push(musicalVarietyShowResult)

        var talkShow = [talkShowCountForKrisTV, talkShowCountForGGV, talkShowCountForMars, talkShowCountForRyzzaMae, talkShowCountForFacePeople]
        var talkShowResult = []
        data.results.bestTalkShow.forEach(function (response) {
          if(largest(talkShow) === response.count) {
            var winner = {
              talkShow: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            talkShowResult.push(winner)
          }
        })
        out.push(talkShowResult)

        var talkShowHost = [talkShowHostCountForKris, talkShowHostCountForViceGanda, talkShowHostCountForCamille, talkShowHostCountForRyzzaMae, talkShowHostCountForGelli, talkShowHostCountForToni]
        var talkShowHostResult = []
        data.results.bestTalkShowHost.forEach(function (response) {
          if(largest(talkShowHost) === response.count) {
            var winner = {
              talkShowHost: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            talkShowHostResult.push(winner)
          }
        })
        out.push(talkShowHostResult)

        var entertainmentNewsProgram = [entertainmentNewsProgramCountForTheBuzz, entertainmentNewsProgramCountForStarTalk, entertainmentNewsProgramCountForShowbizPolice, entertainmentNewsProgramCountForAquinoAndAbunda]
        var entertainmentNewsProgramResult = []
        data.results.bestEntertainmentNewsProgram.forEach(function (response) {
          if(largest(entertainmentNewsProgram) === response.count) {
            var winner = {
              entertainmentNewsProgram: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            entertainmentNewsProgramResult.push(winner)
          }
        })
        out.push(entertainmentNewsProgramResult)

        var entertainmentNewsProgramHost = [entertainmentNewsProgramHostCountForKris, entertainmentNewsProgramHostCountForBoy, entertainmentNewsProgramHostCountForJoey, entertainmentNewsProgramHostCountForRaymond]
        var entertainmentNewsProgramHostResult = []
        data.results.bestEntertainmentNewsProgramHost.forEach(function (response) {
          if(largest(entertainmentNewsProgramHost) === response.count) {
            var winner = {
              entertainmentNewsProgramHost: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            entertainmentNewsProgramHostResult.push(winner)
          }
        })
        out.push(entertainmentNewsProgramHostResult)

        var varietyShow = [varietyShowCountForShowTime, varietyShowCountForEatBulaga]
        var varietyShowResult = []
        data.results.bestVarietyShow.forEach(function (response) {
          if(largest(varietyShow) === response.count) {
            var winner = {
              varietyShow: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            varietyShowResult.push(winner)
          }
        })
        out.push(varietyShowResult)

        var varietyShowHost = [variteyShowHostCountForViceGanda, variteyShowHostCountForAnn, variteyShowHostCountForVic, variteyShowHostCountForJoey]
        var varietyShowHostResult = []
        data.results.bestVarietyShowHost.forEach(function (response) {
          if(largest(varietyShowHost) === response.count) {
            var winner = {
              varietyShowHost: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            varietyShowHostResult.push(winner)
          }
        })
        out.push(varietyShowHostResult)

        var gameShow = [gameShowCountForBetOnYourBaby, gameShowCountForSingingBee, gameShowCountForPicture, gameShowCountForCelebrityBluff, gameShowCountForMillionaire, gameShowCountForKillerKaraoke]
        var gameShowResult = []
        data.results.bestGameShow.forEach(function (response) {
          if(largest(gameShow) === response.count) {
            var winner = {
              gameShow: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            gameShowResult.push(winner)
          }
        })
        out.push(gameShowResult)

        var gameShowHost = [gameShowHostCountForJudyAnn, gameShowHostCountForRyan, gameShowHostCountForEugene, gameShowHostCountForVic, gameShowHostCountForMichael, gameShowHostCountForAmy]
        var gameShowHostResult = []
        data.results.bestGameShowHost.forEach(function (response) {
          if(largest(gameShowHost) === response.count) {
            var winner = {
              gameShowHost: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            gameShowHostResult.push(winner)
          }
        })
        out.push(gameShowHostResult)

        var dramaAnthology = [dramaAnthologyCountForMaalala, dramaAnthologyCountForMagpakailanman, dramaAnthologyCountForMinamahal]
        var dramaAnthologyResult = []
        data.results.bestDramaAnthology.forEach(function (response) {
          if(largest(dramaAnthology) === response.count) {
            var winner = {
              dramaAnthology: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            dramaAnthologyResult.push(winner)
          }
        })
        out.push(dramaAnthologyResult)

        var morningShow = [morningShowCountForUmagangKayGanda, morningShowCountForUnangHirit, morningShowCountForGoodMorningClub]
        var morningShowResult = []
        data.results.bestMorningShow.forEach(function (response) {
          if(largest(morningShow) === response.count) {
            var winner = {
              morningShow: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            morningShowResult.push(winner)
            return true;
          }
        })
        out.push(morningShowResult)

        var morningShowHost = [morningShowHostCountForAnthony, morningShowHostCountForBernadette, morningShowHostCountForArnold, morningShowHostCountForRhea, morningShowHostCountForCheryl]
        var morningShowHostResult = []
        data.results.bestMorningShowHost.forEach(function (response) {
          if(largest(morningShowHost) === response.count) {
            var winner = {
              morningShowHost: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            morningShowHostResult.push(winner)
          }
        })
        out.push(morningShowHostResult)

        var newsProgram = [newsProgramCountForTVPatrol, newsProgramCountFor24Oras, newsProgramCountForBandila, newsProgramCountForSaksi, newsProgramCountForAksyon, newsProgramCountForSONA]
        var newsProgramResult = []
        data.results.bestNewsProgram.forEach(function (response) {
          if(largest(newsProgram) === response.count) {
            var winner = {
              newsProgram: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            newsProgramResult.push(winner)
          }
        })
        out.push(newsProgramResult)

        var newsProgramMaleAnchor = [newsProgramMaleAnchorCountForNoli, newsProgramMaleAnchorCountForTed, newsProgramMaleAnchorCountForMike, newsProgramMaleAnchorCountForErwin, newsProgramMaleAnchorCountForArnold, newsProgramMaleAnchorCountForJulius]
        var newsProgramMaleAnchorResult = []
        data.results.bestNewsProgramMaleAnchor.forEach(function (response) {
          if(largest(newsProgramMaleAnchor) === response.count) {
            var winner = {
              newsProgramMaleAnchor: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            newsProgramMaleAnchorResult.push(winner)
          }
        })
        out.push(newsProgramMaleAnchorResult)

        var newsProgramFemaleAnchor = [newsProgramFemaleAnchorCountForKorina, newsProgramFemaleAnchorCountForMel, newsProgramFemaleAnchorCountForJessica, newsProgramFemaleAnchorCountForCheryl, newsProgramFemaleAnchorCountForKaren]
        var newsProgramFemaleAnchorResult = []
        data.results.bestNewsProgramFemaleAnchor.forEach(function (response) {
          if(largest(newsProgramFemaleAnchor) === response.count) {
            var winner = {
              newsProgramFemaleAnchor: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            newsProgramFemaleAnchorResult.push(winner)
          }
        })
        out.push(newsProgramFemaleAnchorResult)

        var publicAffairsTalkShow = [newsPublicAffairsTalkShowCountForBottomline, newsPublicAffairsTalkShowCountForTonightWithArnold, newsPublicAffairsTalkShowCountForTunayNaBuhay, newsPublicAffairsTalkShowCountForTapantanNiTunying]
        var publicAffairsTalkShowResult = []
        data.results.bestNewsPublicAffairsTalkShow.forEach(function (response) {
          if(largest(publicAffairsTalkShow) === response.count) {
            var winner = {
              publicAffairsTalkShow: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            publicAffairsTalkShowResult.push(winner)
            return true;
          }
        })
        out.push(publicAffairsTalkShowResult)

        var magazineShow = [magazineShowCountForRatedK, magazineShowCountForKMJS, magazineShowCountForBND]
        var magazineShowResult = []
        data.results.bestMagazineShow.forEach(function (response) {
          if(largest(magazineShow) === response.count) {
            var winner = {
              magazineShow: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            magazineShowResult.push(winner)
          }
        })
        out.push(magazineShowResult)

        var magazineShowHost = [magazineShowHostCountForKorina, magazineShowHostCountForJessica, magazineShowHostCountForDrew]
        var magazineShowHostResult = []
        data.results.bestMagazineShowHost.forEach(function (response) {
          if(largest(magazineShowHost) === response.count) {
            var winner = {
              magazineShowHost: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            magazineShowHostResult.push(winner)
          }
        })
        out.push(magazineShowHostResult)

        var investigativeShow = [investigativeShowCountForSOCO, investigativeShowCountForImbestigador, investigativeShowCountForTutokTulfo, investigativeShowCountForInvestigativeDocumentaries, investigativeShowCountForFailonNgayon]
        var investigativeShowResult = []
        data.results.bestInvestigativeShow.forEach(function (response) {
          if(largest(investigativeShow) === response.count) {
            var winner = {
              investigativeShow: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            investigativeShowResult.push(winner)
          }
        })
        out.push(investigativeShowResult)

        var educationalShow = [educationShowCountForMatanglawin, educationShowCountForKaps, educationShowCountForIbilib, educationShowCountForSalamatDoc, educationShowCountForBornWild]
        var educationalShowResult = []
        data.results.bestEducationShow.forEach(function (response) {
          if(largest(educationalShow) === response.count) {
            var winner = {
              educationalShow: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            educationalShowResult.push(winner)
            return true;
          }
        })
        out.push(educationalShowResult)

        var documentaryShow = [documentaryShowCountForIWitness, documentaryShowCountForReportersNotebook, documentaryShowCountForFrontrow]
        var documentaryShowResult = []
        data.results.bestDocumentaryShow.forEach(function (response) {
          if(largest(documentaryShow) === response.count) {
            var winner = {
              documentaryShow: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            documentaryShowResult.push(winner)
            return true;
          }
        })
        out.push(documentaryShowResult)

        var localTVStation = [localTVStationCountForCLTV36, localTVStationCountForPEPTV, localTVStationCountForABSCBNPampanga, localTVStationCountForGNN44]
        var localTVStationResult = []
        data.results.bestLocalTVStation.forEach(function (response) {
          if(largest(localTVStation) === response.count) {
            var winner = {
              localTVStation: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            localTVStationResult.push(winner)
          }
        })
        out.push(localTVStationResult)

        var TVStation = [TVStationCountForABSCBN, TVStationCountForGMA, TVStationCountForTV5]
        var TVStationResult = []
        data.results.bestTVStation.forEach(function (response) {
          if(largest(TVStation) === response.count) {
            var winner = {
              TVStation: {
                title: response.title,
                name: response.name,
                count: response.count,
                list: response.list
              }
            }
            TVStationResult.push(winner)
            return true;
          }
        })

        out.push(TVStationResult)
        res.json(out)

      })
    })
  })
}
