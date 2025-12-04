import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, BarChart3, Users, Calendar } from 'lucide-react';
import './SurveyResults.css';
import { useLanguage } from '../contexts/LanguageContext';

const SurveyResults = () => {
      const {t} = useLanguage()
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // Mock data - in real app, this would come from API
    const mockSurvey = {
      id: parseInt(id),
      title: t('form.title'),
      description: t('form.description'),
      totalResponses: 45,
      createdDate: "2024-01-15",
      endDate: "2024-02-15",
      status: "completed"
    };

    const mockResults = {
      question1: {
        question: t('form.q1'),
        type: "multiple-choice",
        responses: {
           [t('form.excellent')]: 15,
           [t('form.good')]: 20,
           [t('form.average')]: 8,
           [t('form.poor')]: 2,
           [t('form.veryPoor')]: 0
        },
        total: 45
      },
      question2: {
        question:  t('form.q2'),
        type: "single-choice",
        responses: {
           [t('form.lect')]: 12,
           [t('form.handOn')]: 18,
           [t('form.groupProj')]: 8,
          [t('form.assign')]: 5,
           [t('form.instruct')]: 2
        },
        total: 45
      },
      question3: {
        question:  t('form.q3'),
        type: "text",
        responses: [
          t('form.moreInter'),
          t('form.additional'),
          t('form.better'),
         t('form.realWorld'),
          t('form.improved')
        ],
        total: 45
      },
      question4: {
        question:  t('form.q4'),
        type: "rating",
        responses: {
          "1": 1,
          "2": 2,
          "3": 8,
          "4": 20,
          "5": 14
        },
        total: 45
      },
      question5: {
        question:  t('form.q5'),
        type: "checkbox",
        responses: {
           [t('form.data')]: 32,
          [t('form.web')]: 25,
           [t('form.database')]: 18,
           [t('form.software')]: 15,
           [t('form.mobileApp')]: 12,
           [t('form.machineLearning')]: 8
        },
        total: 45
      }
    };

    setSurvey(mockSurvey);
    setResults(mockResults);
    setLoading(false);
  }, [id]);

  const calculatePercentage = (count, total) => {
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };

  const renderQuestionResult = (questionId, questionData) => {
    switch (questionData.type) {
      case 'multiple-choice':
      case 'single-choice':
        return (
          <div className="chart-container">
            <div className="chart-bars">
              {Object.entries(questionData.responses).map(([option, count]) => {
                const percentage = calculatePercentage(count, questionData.total);
                return (
                  <div key={option} className="bar-item">
                    <div className="bar-label">
                      <span className="option-text">{option}</span>
                      <span className="option-count">{count} ({percentage}%)</span>
                    </div>
                    <div className="bar-track">
                      <div 
                        className="bar-fill"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'rating':
        return (
          <div className="rating-chart">
            <div className="rating-bars">
              {Object.entries(questionData.responses).map(([rating, count]) => {
                const percentage = calculatePercentage(count, questionData.total);
                return (
                  <div key={rating} className="rating-bar">
                    <div className="rating-label">{rating}</div>
                    <div className="rating-track">
                      <div 
                        className="rating-fill"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="rating-count">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div className="checkbox-chart">
            <div className="checkbox-bars">
              {Object.entries(questionData.responses).map(([option, count]) => {
                const percentage = calculatePercentage(count, questionData.total);
                return (
                  <div key={option} className="checkbox-bar">
                    <div className="checkbox-label">{option}</div>
                    <div className="checkbox-track">
                      <div 
                        className="checkbox-fill"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="checkbox-count">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="text-responses">
            <h4>{t('form.sample')}</h4>
            <div className="responses-list">
              {questionData.responses.slice(0, 5).map((response, index) => (
                <div key={index} className="response-item">
                  <span className="response-number">{index + 1}.</span>
                  <span className="response-text">"{response}"</span>
                </div>
              ))}
              {questionData.responses.length > 5 && (
                <div className="more-responses">
                  {t('form.and')} {questionData.responses.length - 5} {t('form.more')}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="survey-results">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>{t('form.loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!survey || !results) {
    return (
      <div className="survey-results">
        <div className="container">
          <div className="error-message">
            <h2>{t('form.noRes')}</h2>
            <p>{t('form.notExist')}</p>
            <button onClick={() => navigate('/surveys')} className="btn btn-primary">
               {t('form.back')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="survey-results">
      <div className="container">
        <div className="results-header">
          <button onClick={() => navigate('/surveys')} className="back-btn">
            <ArrowLeft size={20} />
            {t('form.back')}
          </button>
          <h1>{survey.title}</h1>
          <p>{survey.description}</p>
        </div>

        <div className="results-stats">
          <div className="stat-card">
            <Users size={24} />
            <div>
              <h3>{survey.totalResponses}</h3>
              <p>{t('form.totalResponses')}</p>
            </div>
          </div>
          <div className="stat-card">
            <Calendar size={24} />
            <div>
              <h3>{new Date(survey.endDate).toLocaleDateString()}</h3>
              <p>{t('form.endDate')}</p>
            </div>
          </div>
          <div className="stat-card">
            <BarChart3 size={24} />
            <div>
              <h3>{Object.keys(results).length}</h3>
              <p>{t('createSurvey.questions')}</p>
            </div>
          </div>
        </div>

        <div className="results-content">
          <div className="results-actions">
            <button className="btn btn-outline">
              <Download size={20} />
              E{t('form.export')}
            </button>
          </div>

          <div className="questions-results">
            {Object.entries(results).map(([questionId, questionData], index) => (
              <div key={questionId} className="question-result">
                <div className="question-header">
                  <h3>{t('form.question')} {index + 1}</h3>
                  <span className="response-count">
                    {questionData.total} {t('form.responses')}
                  </span>
                </div>
                <p className="question-text">{questionData.question}</p>
                {renderQuestionResult(questionId, questionData)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyResults;

