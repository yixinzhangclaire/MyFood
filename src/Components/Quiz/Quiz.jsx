import React, { useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
    const [index, setIndex] = useState(0); // Current question index
    const [scores, setScores] = useState([]); // Track all selected scores
    const [lock, setLock] = useState(false); // Prevent multiple selections per question
    const [selectedOption, setSelectedOption] = useState(null); // Track selected option for styling
    const [showRecommendations, setShowRecommendations] = useState(false); // Toggle for recommendations

    const question = data[index]; // Current question object

    const handleSelect = (score, i) => {
        if (!lock) {
            setScores((prevScores) => [...prevScores, score]); // Add selected score to scores array
            setSelectedOption(i); // Save the selected option index for styling
            setLock(true); // Lock selection
        }
    };

    const next = () => {
        if (lock) {
            if (index < data.length - 1) {
                setIndex(index + 1); // Move to the next question
                setLock(false); // Unlock for the next question
                setSelectedOption(null); // Reset the selected option
            } else {
                setShowRecommendations(true); // Show recommendations at the end
            }
        }
    };

    const calculateRecommendations = () => {
        const budget = scores.filter((score) => typeof score === 'number' && score <= 50).reduce((a, b) => a + b, 0);
        const foodType = scores.find((score) => typeof score === 'string' && ['comfort', 'healthy', 'international', 'sweet'].includes(score));
        const mood = scores.find((score) => ['adventurous', 'relaxed', 'indulgent', 'efficient'].includes(score));
        const location = scores.find((score) => ['McIntyre', 'McLennan', 'Trottier', 'Burnside'].includes(score));
        const eatingTime = scores.find((score) => typeof score === 'number' && score >= 10); // Duration

        // Define priority recommendations
        let recommendation = '';

        // Location-based priority
        if (location === 'McIntyre') recommendation = 'Visit the McIntyre cafe for quick and easy bites.';
        else if (location === 'McLennan') recommendation = 'McLennan-Redpath cafe has snacks and coffee perfect for a study break.';
        else if (location === 'Trottier') recommendation = 'Trottier cafe has great pastry and meal options.';
        else if (location === 'Burnside') recommendation = 'Burnside cafe is ideal for a peaceful meal or coffee.';

        // Budget overrides location if the budget is very low
        if (budget <= 10) recommendation = 'Budget-friendly options like food trucks or grab-and-go snacks.';

        // Food type overrides location and budget
        if (foodType === 'comfort') recommendation = 'Comfort food options like pizza or burgers.';
        if (foodType === 'healthy') recommendation = 'Healthy bowls and salads are perfect for your mood.';
        if (foodType === 'international') recommendation = 'Explore international cuisines like sushi or tacos.';
        if (foodType === 'sweet') recommendation = 'Don’t forget the desserts at Trottier or McLennan!';

        // Eating time considerations
        if (eatingTime <= 10) recommendation = 'Grab quick bites like a sandwich or pre-packed snacks.';
        if (eatingTime > 10 && eatingTime <= 20) recommendation = 'Try fast food or quick-service meals nearby.';
        if (eatingTime > 20 && eatingTime <= 30) recommendation = 'You have time for a sit-down meal at Gerts Cafe.';
        if (eatingTime > 30) recommendation = 'Enjoy a relaxed, full-course meal at a restaurant near campus.';

        return recommendation;
    };

    return (
        <div className="container">
            <h1>Foodie Find Food</h1>
            <hr />
            {showRecommendations ? (
                <div>
                    <h2>Your Personalized Recommendation:</h2>
                    <p className="recommendation">{calculateRecommendations()}</p>
                </div>
            ) : (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        {question.options.map((option, i) => (
                            <li
                                key={i}
                                className={selectedOption === i ? "selected" : ""}
                                onClick={() => handleSelect(option.score, i)}
                            >
                                {option.text}
                            </li>
                        ))}
                    </ul>
                    <button onClick={next}>Next</button>
                    <div className="index">{index + 1} of {data.length} questions</div>
                </>
            )}
        </div>
    );
};

export default Quiz;
