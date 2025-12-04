import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Users, CheckCircle, Clock, Plus } from 'lucide-react';
import './Dashboard.css';
import { useLanguage } from '../contexts/LanguageContext';

const Dashboard = () => {
  const {t} = useLanguage();
  const [stats, setStats] = useState({
    totalSurveys: 0,
    activeSurveys: 0,
    completedSurveys: 0,
    totalResponses: 0
  });

  const [recentSurveys, setRecentSurveys] = useState([]);

  useEffect(() => {
    setStats({
      totalSurveys: 12,
      activeSurveys: 8,
      completedSurveys: 4,
      totalResponses: 156
    });

    setRecentSurveys([
      {
        id: 1,
        title: "dashboard.survey.courseFeedback",
        responses: 45,
        status: "active",
        createdDate: "2024-01-15"
      },
      {
        id: 2,
        title: "dashboard.survey.libraryServices",
        responses: 23,
        status: "completed",
        createdDate: "2024-01-10"
      },
      {
        id: 3,
        title: "dashboard.survey.campus",
        responses: 67,
        status: "active",
        createdDate: "2024-01-12"
      }
    ]);
  }, []);

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: color }}>
        <Icon size={24} />
      </div>
      <div className="stat-content">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-title">{title}</p>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>{t('dashboard.title')}</h1>
          <p>{t('dashboard.subtitle')}</p>
        </div>

        <div className="stats-grid">
          <StatCard
            icon={BarChart3}
            title={t('dashboard.stats.totalSurveys')}
            value={stats.totalSurveys}
            color="#eff6ff"
          />
          <StatCard
            icon={Clock}
            title={t('dashboard.stats.activeSurveys')}
            value={stats.activeSurveys}
            color="#fef3c7"
          />
          <StatCard
            icon={CheckCircle}
            title={t('dashboard.stats.completed')}
            value={stats.completedSurveys}
            color="#d1fae5"
          />
          <StatCard
            icon={Users}
            title={t('dashboard.stats.totalResponses')}
            value={stats.totalResponses}
            color="#f3e8ff"
          />
        </div>

        <div className="dashboard-content">
          <div className="recent-surveys">
            <div className="section-header">
              <h2>{t('dashboard.recentSurveys')}</h2>
              <Link to="/surveys" className="btn btn-outline">
                {t('dashboard.viewAll')}
              </Link>
            </div>
            
            <div className="surveys-list">
              {recentSurveys.map(survey => (
                <div key={survey.id} className="survey-card">
                  <div className="survey-info">
                    <h3 className="survey-title">{t(survey.title)}</h3>
                    <div className="survey-meta">
                      <span className="survey-responses">
                        <Users size={16} />
                        {survey.responses} {t('dashboard.responses')}
                      </span>
                      <span className={`survey-status ${survey.status}`}>
                        {survey.status === 'active' ? t('dashboard.stats.active') : t('dashboard.stats.oneCompleted')}
                      </span>
                    </div>
                  </div>
                  <div className="survey-actions">
                    {survey.status === 'active' ? (
                      <Link to={`/surveys/${survey.id}`} className="btn btn-primary">
                        {t('dashboard.takeSurvey')}
                      </Link>
                    ) : (
                      <Link to={`/results/${survey.id}`} className="btn btn-secondary">
                        {t('dashboard.viewResults')}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="quick-actions">
            <h2>{t('dashboard.quickActions')}</h2>
            <div className="actions-grid">
              <Link to="/create-survey" className="action-card">
                <Plus size={32} />
                <h3>{t('dashboard.createNewSurvey')}</h3>
                <p>{t('dashboard.createNewSurveyDesc')}</p>
              </Link>
              <Link to="/surveys" className="action-card">
                <BarChart3 size={32} />
                <h3>{t('dashboard.browseSurveys')}</h3>
                <p>{t('dashboard.browseSurveysDesc')}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
