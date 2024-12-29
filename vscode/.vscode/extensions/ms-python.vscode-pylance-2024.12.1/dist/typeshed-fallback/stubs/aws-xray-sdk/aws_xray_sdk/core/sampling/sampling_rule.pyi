from _typeshed import Incomplete

class SamplingRule:
    def __init__(
        self,
        name,
        priority,
        rate,
        reservoir_size,
        host: Incomplete | None = None,
        method: Incomplete | None = None,
        path: Incomplete | None = None,
        service: Incomplete | None = None,
        service_type: Incomplete | None = None,
    ) -> None: ...
    def match(self, sampling_req): ...
    def is_default(self): ...
    def snapshot_statistics(self): ...
    def merge(self, rule) -> None: ...
    def ever_matched(self): ...
    def time_to_report(self): ...
    def increment_request_count(self) -> None: ...
    def increment_borrow_count(self) -> None: ...
    def increment_sampled_count(self) -> None: ...
    @property
    def rate(self): ...
    @rate.setter
    def rate(self, v) -> None: ...
    @property
    def name(self): ...
    @property
    def priority(self): ...
    @property
    def reservoir(self): ...
    @reservoir.setter
    def reservoir(self, v) -> None: ...
    @property
    def can_borrow(self): ...
    @property
    def request_count(self): ...
    @property
    def borrow_count(self): ...
    @property
    def sampled_count(self): ...
