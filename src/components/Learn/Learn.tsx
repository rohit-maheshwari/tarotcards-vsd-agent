import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Shield, Search, Info, X } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from "./mitigation.json";
import "./Learn.css"

interface TechnologyItem {
  ID: string;
  Subfield: string;
  Name: string;
  Description_of_Technology: string;
  Desired_Consequence: string;
  Undesired_Consequence: string;
  Description_of_Mitigation_Strategy: string;
}

interface TechnologyCardProps {
  data: TechnologyItem;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({ data }) => {
  return (
    <div className="card h-100 shadow-sm border-0 transition-all duration-300 hover:shadow">
      <div className="card-body">
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-primary rounded-pill">{data.ID}</span>
              <span className="text-muted small fw-medium">{data.Subfield}</span>
            </div>
          </div>
          <h4 className="card-title fw-bold mb-0">{data.Name}</h4>
        </div>
        
        <div className="mb-4 p-3 bg-light rounded">
          <div className="d-flex gap-2">
            <Info className="flex-shrink-0 text-primary" size={20} />
            <p className="card-text small mb-0">{data.Description_of_Technology}</p>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="p-3 rounded h-100" style={{ backgroundColor: 'rgba(25, 135, 84, 0.1)' }}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <CheckCircle className="text-success" size={20} />
                <h6 className="mb-0 fw-semibold text-success">Desired Impact</h6>
              </div>
              <p className="small mb-0 text-dark text-start">{data.Desired_Consequence}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 rounded h-100" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)' }}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <AlertCircle className="text-danger" size={20} />
                <h6 className="mb-0 fw-semibold text-danger">Risk Factors</h6>
              </div>
              <p className="small mb-0 text-dark text-start">{data.Undesired_Consequence}</p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded" style={{ backgroundColor: 'rgba(111, 66, 193, 0.1)' }}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <Shield className="text-purple" size={20} style={{ color: '#6f42c1' }} />
            <h6 className="mb-0 fw-semibold" style={{ color: '#6f42c1' }}>Mitigation Strategy</h6>
          </div>
          <p className="small mb-0 text-dark text-start">{data.Description_of_Mitigation_Strategy}</p>
        </div>
      </div>
    </div>
  );
};

const TechnologyDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = Array.from(
    new Set(data.map((item) => item.Subfield))
  );

  const filteredData = data.filter((item: TechnologyItem) => {
    const matchesSearch = 
      item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Description_of_Technology.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Subfield.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    return matchesSearch && item.Subfield === selectedFilter;
  });

  const setFilter = (filter: string) => {
    if (selectedFilter === "all") {
      setSelectedFilter(filter);
    } else {
      setSelectedFilter("all");
    }
  }

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container mt-0">
        <div className="card shadow-sm mb-12">
          <div className="card-body">
            <div className="row align-items-center mb-4">
              <div className="col-md-12 mb-3 mb-md-0">
                <h1 className="h3 fw-bold mb-1">Learn about existing undesirable consequences in computing research</h1>
                <p className="text-muted mb-0">More importantly, existing mitigation strategies by researchers</p>
              </div>
              
              {/* <div className="col-md-6">
                <div className="position-relative">
                  <Search className="position-absolute top-50 translate-middle-y" style={{ left: '12px' }} size={20} />
                  <input
                    type="text"
                    placeholder="Search technologies..."
                    className="form-control form-control-lg ps-5"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="btn btn-link position-absolute top-50 translate-middle-y end-0 me-2 p-0"
                      style={{ color: '#6c757d' }}
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div> */}
            </div>

            <div className="d-flex gap-2 overflow-auto pb-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilter(filter)}
                  className={`btn ${
                    selectedFilter === filter
                      ? 'btn-primary'
                      : 'btn-outline-secondary'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="scrollable-container row g-4">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div key={index} className="col-lg-6">
                <TechnologyCard data={item} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <Search size={48} className="text-muted mb-3" />
              <h3 className="h4 fw-bold">No results found</h3>
              <p className="text-muted">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnologyDashboard;
