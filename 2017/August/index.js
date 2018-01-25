/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */

var Alexa = require('alexa-sdk');

var states = {
    STARTMODE: '_STARTMODE', // Prompt the user to start or restart the game.
    ASKMODE: '_ASKMODE', // Alexa is asking user the questions.
    DESCRIPTIONMODE: '_DESCRIPTIONMODE' // Alexa is describing the final choice and prompting to start again or quit
};

// Questions
var nodes = [{ "node": 1, "message": "Do you like going to parties?", "yes": 2, "no": 3 },
    { "node": 2, "message": "Are you a practical person?", "yes": 4, "no": 5 },
    { "node": 3, "message": "Are you a practical person?", "yes": 6, "no": 7 },
    { "node": 4, "message": "Do you make decisions based on logic?", "yes": 8, "no": 9 },
    { "node": 5, "message": "Do you make decisions based on logic?", "yes": 10, "no": 11 },
    { "node": 6, "message": "Do you make decisions based on logic?", "yes": 12, "no": 13 },
    { "node": 7, "message": "Do you make decisions based on logic?", "yes": 14, "no": 15 },
    { "node": 8, "message": "Do you plan out your day?", "yes": 16, "no": 17 },
    { "node": 9, "message": "Do you plan out your day?", "yes": 18, "no": 19 },
    { "node": 10, "message": "Do you plan out your day?", "yes": 20, "no": 21 },
    { "node": 11, "message": "Do you plan out your day?", "yes": 22, "no": 23 },
    { "node": 12, "message": "Do you plan out your day?", "yes": 24, "no": 25 },
    { "node": 13, "message": "Do you plan out your day?", "yes": 26, "no": 27 },
    { "node": 14, "message": "Do you plan out your day?", "yes": 28, "no": 29 },
    { "node": 15, "message": "Do you plan out your day?", "yes": 30, "no": 31 },



    // Answers & descriptions
    { "node": 16, "message": "ESTJ", "yes": 0, "no": 0, "description": "ESTJ. An ESTJ Personality is known as the supervisor. ESTJ’s are practical, realistic, and matter-of-fact, with a natural head for business or mechanics. Though they are not interested in subjects they see no use for, they can apply themselves when necessary." },
    { "node": 17, "message": "ESTP", "yes": 0, "no": 0, "description": "ESTP. An ESTP Personality is known as the doer. ESTPs are hands-on learners who live in the moment, seeking the best in life, wanting to share it with their friends." },
    { "node": 18, "message": "ESFJ", "yes": 0, "no": 0, "description": "ESFJ. An ESFJ Personality is known as the caregiver. ESFJ’s focus on the outside world and assess their experiences subjectively. They largely base their judgments on their belief system and on the effects of actions on people." },
    { "node": 19, "message": "ESFP", "yes": 0, "no": 0, "description": "ESFP. An ESFP Personality is known as the performer. ESFP’s live in the moment, experiencing life to the fullest. They enjoy people, as well as material comforts." },
    { "node": 20, "message": "ENTJ", "yes": 0, "no": 0, "description": "ENTJ. An ENTJ Personality is known as the CEO. ENTJs focus on the most efficient and organized means of performing a task. This quality, along with their goal orientation, often makes ENTJs superior leaders, both realistic and visionary in implementing a long-term plan." },
    { "node": 21, "message": "ENTP", "yes": 0, "no": 0, "description": "ENTP. An ENTP Personality is known as the inventor. ENTP’s are quick to see complex interrelationships between people, things, and ideas and are able to analyze these interrelationships in profound detail. The result is an in-depth understanding of the way things and relationships work, and how they can be improved." },
    { "node": 22, "message": "ENFJ", "yes": 0, "no": 0, "description": "ENFJ. An ENFJ Personality is known as the mentor. ENFJs seek continuity through harmonious relationships and collective values. They excel at picking up on the tone of a situation and acting accordingly, adding warmth to a cool setting or turning sour into sweet." },
    { "node": 23, "message": "ENFP", "yes": 0, "no": 0, "description": "ENFP. An ENFP Personality is known as the discoverer. ENFPs are initiators of change, keenly perceptive of possibilities. They energize and stimulate others through their contagious enthusiasm." },
    { "node": 24, "message": "ISTJ", "yes": 0, "no": 0, "description": "ISTJ. An ISTJ Personality is known as the inspector. ISTJs thrive on organization. They keep their lives and environments well-regulated. They bring painstaking attention to detail in their work and will not rest until a job is well completed." },
    { "node": 25, "message": "ISTP", "yes": 0, "no": 0, "description": "ISTP. An ISTP Personality is known as the craftsman. ISTPs excel at analyzing situations to reach the heart of a problem so that they can swiftly implement a functional repair, making them ideally suited to the field of engineering." },
    { "node": 26, "message": "ISFJ", "yes": 0, "no": 0, "description": "ISFJ. An ISFJ Personality is known as the nurturer. ISFJs are interested in maintaining order and harmony in every aspect of their lives. They are steadfast and meticulous in handling their responsibilities." },
    { "node": 27, "message": "ISFP", "yes": 0, "no": 0, "description": "An ISFP Personality is known as the artist. ISFPs are peaceful, easygoing people who adopt a “live and let live” approach to life. They enjoy taking things at their own pace and tend to live in the moment." },
    { "node": 28, "message": "INTJ", "yes": 0, "no": 0, "description": "An INTJ Personality is known as the mastermind. INTJs are analytical. Like INTPs, they are most comfortable working alone and tend to be less sociable than other types." },
    { "node": 29, "message": "INTP", "yes": 0, "no": 0, "description": "An INTP Personality is known as the scientist. INTPs are quiet, thoughtful, analytical individuals who tend to spend long periods of time on their own, working through problems and forming solutions." },
    { "node": 30, "message": "INFJ", "yes": 0, "no": 0, "description": "An INFJ Personality is known as the counselor. INFJs are conscientious and value-driven. They seek meaning in relationships, ideas, and events, with an eye toward better understanding themselves and others." },
    { "node": 31, "message": "INFP", "yes": 0, "no": 0, "description": "An INFP Personality is known as the idealist. The polite, reserved exterior of INFPs can at first make them difficult to get to know. They enjoy conversation, however, taking particular delight in the unusual." },

];


// this is used for keep track of visted nodes when we test for loops in the tree
var visited = [nodes.length];

// These are messages that Alexa says to the user during conversation

// This is the intial welcome message
var welcomeMessage = "Welcome to the personality quiz, are you ready to take it?";

// This is the message that is repeated if the response to the initial welcome message is not heard
var repeatWelcomeMessage = "Say yes to start the quiz or no to quit.";

// this is the message that is repeated if Alexa does not hear/understand the reponse to the welcome message
var promptToStartMessage = "Say yes to continue, or no to end the quiz.";

// This is the prompt during the game when Alexa doesnt hear or understand a yes / no reply
var promptToSayYesNo = "Say yes or no to answer the question.";

// This is the response to the user after the final question when Alex decides on what group choice the user should be given
var decisionMessage = "I think your personality is";

// This is the prompt to ask the user if they would like to hear a short description of thier chosen profession or to play again
var playAgainMessage = "Say 'tell me more' to hear a short description for this personality, or do you want to play again?";

// this is the help message during the setup at the beginning of the game
var helpMessage = "I will ask you some questions that will identify what your personality. Want to start now?";

// This is the goodbye message when the user has asked to quit the game
var goodbyeMessage = "Ok, see you next time!";

var speechNotFoundMessage = "Could not find speech for node";

var nodeNotFoundMessage = "In nodes array could not find node";

var descriptionNotFoundMessage = "Could not find description for node";

var loopsDetectedMessage = "A potential loop was detected on the node tree, please fix before continuing";

var utteranceTellMeMore = "tell me more";

var utterancePlayAgain = "play again";

// the first node that we will use
var START_NODE = 1;

// --------------- Handlers -----------------------

// Called when the session starts.
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandler, startGameHandlers, askQuestionHandlers, descriptionHandlers);
    alexa.execute();
};

// set state to start up and  welcome the user
var newSessionHandler = {
    'LaunchRequest': function() {
        this.handler.state = states.STARTMODE;
        this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
    },
    'AMAZON.HelpIntent': function() {
        this.handler.state = states.STARTMODE;
        this.emit(':ask', helpMessage, helpMessage);
    },
    'Unhandled': function() {
        this.handler.state = states.STARTMODE;
        this.emit(':ask', promptToStartMessage, promptToStartMessage);
    }
};

// --------------- Functions that control the skill's behavior -----------------------

// Called at the start of the game, picks and asks first question for the user
var startGameHandlers = Alexa.CreateStateHandler(states.STARTMODE, {
    'AMAZON.YesIntent': function() {

        // ---------------------------------------------------------------
        // check to see if there are any loops in the node tree - this section can be removed in production code
        visited = [nodes.length];
        var loopFound = helper.debugFunction_walkNode(START_NODE);
        if (loopFound === true) {
            // comment out this line if you know that there are no loops in your decision tree
            this.emit(':tell', loopsDetectedMessage);
        }
        // ---------------------------------------------------------------

        // set state to asking questions
        this.handler.state = states.ASKMODE;

        // ask first question, the response will be handled in the askQuestionHandler
        var message = helper.getSpeechForNode(START_NODE);

        // record the node we are on
        this.attributes.currentNode = START_NODE;

        // ask the first question
        this.emit(':ask', message, message);
    },
    'AMAZON.NoIntent': function() {
        // Handle No intent.
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.StartOverIntent': function() {
        this.emit(':ask', promptToStartMessage, promptToStartMessage);
    },
    'AMAZON.HelpIntent': function() {
        this.emit(':ask', helpMessage, helpMessage);
    },
    'Unhandled': function() {
        this.emit(':ask', promptToStartMessage, promptToStartMessage);
    }
});


// user will have been asked a question when this intent is called. We want to look at their yes/no
// response and then ask another question. If we have asked more than the requested number of questions Alexa will
// make a choice, inform the user and then ask if they want to play again
var askQuestionHandlers = Alexa.CreateStateHandler(states.ASKMODE, {

    'AMAZON.YesIntent': function() {
        // Handle Yes intent.
        helper.yesOrNo(this, 'yes');
    },
    'AMAZON.NoIntent': function() {
        // Handle No intent.
        helper.yesOrNo(this, 'no');
    },
    'AMAZON.HelpIntent': function() {
        this.emit(':ask', promptToSayYesNo, promptToSayYesNo);
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.StartOverIntent': function() {
        // reset the game state to start mode
        this.handler.state = states.STARTMODE;
        this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
    },
    'Unhandled': function() {
        this.emit(':ask', promptToSayYesNo, promptToSayYesNo);
    }
});

// user has heard the final choice and has been asked if they want to hear the description or to play again
var descriptionHandlers = Alexa.CreateStateHandler(states.DESCRIPTIONMODE, {

    'AMAZON.YesIntent': function() {
        // Handle Yes intent.
        // reset the game state to start mode
        this.handler.state = states.STARTMODE;
        this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
    },
    'AMAZON.NoIntent': function() {
        // Handle No intent.
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.HelpIntent': function() {
        this.emit(':ask', promptToSayYesNo, promptToSayYesNo);
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.StartOverIntent': function() {
        // reset the game state to start mode
        this.handler.state = states.STARTMODE;
        this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
    },
    'DescriptionIntent': function() {
        //var reply = this.event.request.intent.slots.Description.value;
        //console.log('HEARD:' + reply);
        helper.giveDescription(this);
    },
    'Unhandled': function() {
        this.emit(':ask', promptToSayYesNo, promptToSayYesNo);
    }
});

// --------------- Helper Functions  -----------------------

var helper = {

    // gives the user more information on their final choice
    giveDescription: function(context) {

        // get the speech for the child node
        var description = helper.getDescriptionForNode(context.attributes.currentNode);
        var message = description + ', ' + repeatWelcomeMessage;

        context.emit(':ask', message, message);
    },

    // logic to provide the responses to the yes or no responses to the main questions
    yesOrNo: function(context, reply) {

        // this is a question node so we need to see if the user picked yes or no
        var nextNodeId = helper.getNextNode(context.attributes.currentNode, reply);

        // error in node data
        if (nextNodeId == -1) {
            context.handler.state = states.STARTMODE;

            // the current node was not found in the nodes array
            // this is due to the current node in the nodes array having a yes / no node id for a node that does not exist
            context.emit(':tell', nodeNotFoundMessage, nodeNotFoundMessage);
        }

        // get the speech for the child node
        var message = helper.getSpeechForNode(nextNodeId);

        // have we made a decision
        if (helper.isAnswerNode(nextNodeId) === true) {

            // set the game state to description mode
            context.handler.state = states.DESCRIPTIONMODE;

            // append the play again prompt to the decision and speak it
            message = decisionMessage + ' ' + message + ' ,' + playAgainMessage;
        }

        // set the current node to next node we want to go to
        context.attributes.currentNode = nextNodeId;

        context.emit(':ask', message, message);
    },

    // gets the description for the given node id
    getDescriptionForNode: function(nodeId) {

        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                return nodes[i].description;
            }
        }
        return descriptionNotFoundMessage + nodeId;
    },

    // returns the speech for the provided node id
    getSpeechForNode: function(nodeId) {

        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                return nodes[i].message;
            }
        }
        return speechNotFoundMessage + nodeId;
    },

    // checks to see if this node is an choice node or a decision node
    isAnswerNode: function(nodeId) {

        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                if (nodes[i].yes === 0 && nodes[i].no === 0) {
                    return true;
                }
            }
        }
        return false;
    },

    // gets the next node to traverse to based on the yes no response
    getNextNode: function(nodeId, yesNo) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                if (yesNo == "yes") {
                    return nodes[i].yes;
                }
                return nodes[i].no;
            }
        }
        // error condition, didnt find a matching node id. Cause will be a yes / no entry in the array but with no corrosponding array entry
        return -1;
    },

    // Recursively walks the node tree looking for nodes already visited
    // This method could be changed if you want to implement another type of checking mechanism
    // This should be run on debug builds only not production
    // returns false if node tree path does not contain any previously visited nodes, true if it finds one
    debugFunction_walkNode: function(nodeId) {

        // console.log("Walking node: " + nodeId);

        if (helper.isAnswerNode(nodeId) === true) {
            // found an answer node - this path to this node does not contain a previously visted node
            // so we will return without recursing further

            // console.log("Answer node found");
            return false;
        }

        // mark this question node as visited
        if (helper.debugFunction_AddToVisited(nodeId) === false) {
            // node was not added to the visited list as it already exists, this indicates a duplicate path in the tree
            return true;
        }

        // console.log("Recursing yes path");
        var yesNode = helper.getNextNode(nodeId, "yes");
        var duplicatePathHit = helper.debugFunction_walkNode(yesNode);

        if (duplicatePathHit === true) {
            return true;
        }

        // console.log("Recursing no");
        var noNode = helper.getNextNode(nodeId, "no");
        duplicatePathHit = helper.debugFunction_walkNode(noNode);

        if (duplicatePathHit === true) {
            return true;
        }

        // the paths below this node returned no duplicates
        return false;
    },

    // checks to see if this node has previously been visited
    // if it has it will be set to 1 in the array and we return false (exists)
    // if it hasnt we set it to 1 and return true (added)
    debugFunction_AddToVisited: function(nodeId) {

        if (visited[nodeId] === 1) {
            // node previously added - duplicate exists
            // console.log("Node was previously visited - duplicate detected");
            return false;
        }

        // was not found so add it as a visited node
        visited[nodeId] = 1;
        return true;
    }
};