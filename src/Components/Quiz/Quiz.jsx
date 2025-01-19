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
        const budget = scores.find((score) => typeof score === "number" && score <= 50);
        const foodType = scores.find((score) =>
            ["comfort", "healthy", "international", "sweet"].includes(score)
        );
        const mood = scores.find((score) =>
            ["adventurous", "relaxed", "indulgent", "efficient"].includes(score)
        );
        const location = scores.find((score) =>
            ["McIntyre", "McLennan", "Trottier", "Burnside"].includes(score)
        );
        const eatingTime = scores.find((score) => typeof score === "number" && score >= 10);
    
        let recommendation = "Here’s what we recommend based on your preferences:\n";
    
        // Add recommendations for each category
        if (location === "McIntyre") {
            recommendation += "📍 Visit the McIntyre Cafe for quick and easy bites.\n";
        } else if (location === "McLennan") {
            recommendation += "📍 McLennan-Redpath Cafe has snacks and coffee perfect for a study break.\n";
        } else if (location === "Trottier") {
            recommendation += "📍 Trottier Cafe offers great pastry and meal options.\n";
        } else if (location === "Burnside") {
            recommendation += "📍 Burnside Cafe is ideal for a peaceful meal or coffee.\n";
        }
    
        if (budget <= 10) {
            recommendation += "💸 Budget-friendly options include food trucks or grab-and-go snacks.\n";
        } else if (budget > 10 && budget <= 20) {
            recommendation += "💸 Affordable meals like sandwiches or simple bowls are great.\n";
        } else if (budget > 20 && budget <= 50) {
            recommendation += "💸 You can enjoy slightly premium meals at nearby restaurants.\n";
        } else {
            recommendation += "💸 Treat yourself to gourmet dining or a full-course meal.\n";
        }
    
        if (foodType === "comfort") {
            recommendation += "🍔 Comfort food like pizza or burgers is perfect for today.\n";
        } else if (foodType === "healthy") {
            recommendation += "🥗 Healthy options like salads and bowls are a great choice.\n";
        } else if (foodType === "international") {
            recommendation += "🍣 Try international cuisines like sushi or tacos.\n";
        } else if (foodType === "sweet") {
            recommendation += "🍩 Don’t forget the desserts at Trottier or McLennan!\n";
        }
    
        if (mood === "adventurous") {
            recommendation += "🌟 Explore new cuisines or fusion dishes for an exciting experience.\n";
        } else if (mood === "relaxed") {
            recommendation += "🛋️ A cozy cafe or quiet spot would suit your mood.\n";
        } else if (mood === "indulgent") {
            recommendation += "🎉 Indulge in decadent treats or high-quality meals.\n";
        } else if (mood === "efficient") {
            recommendation += "⏳ Quick-service options will help you save time.\n";
        }
    
        if (eatingTime <= 10) {
            recommendation += "⏱️ **MajesThé**: Perfect for a quick bubble tea or snack.\n";
        } else if (eatingTime > 10 && eatingTime <= 20) {
            recommendation += "⏱️ **Nouilles Zhonghua**: Enjoy fast and delicious Chinese noodles.\n";
        } else if (eatingTime > 20 && eatingTime <= 30) {
            recommendation += "⏱️ **Japote**: Savor a sit-down Japanese meal within your time frame.\n";
        } else if (eatingTime > 30) {
            recommendation += "⏱️ **Eaton Centre Food Court**: Explore a variety of cuisines at a relaxed pace.\n";
        }
    
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
