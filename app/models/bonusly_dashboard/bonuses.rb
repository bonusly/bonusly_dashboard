module BonuslyDashboard
  class Bonuses < ApiData

    private

    def endpoint
      '/api/v1/bonuses'
    end

    def relevant_params
      {
        access_token:     params[:access_token],
        limit:            params[:limit],
        start_time:       params[:start_time],
        exclude_archived: true
      }
    end
  end
end
