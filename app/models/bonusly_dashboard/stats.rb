module BonuslyDashboard
  class Stats < ApiData

    private

    def endpoint
      '/api/v1/stats'
    end

    def relevant_params
      {
        access_token:     params[:access_token],
        duration:         params[:duration],
        'fields[type]':   'count_bonuses',
        exclude_archived: true
      }
    end
  end
end
